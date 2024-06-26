import { useEffect, useState } from 'react';

import { TickMath } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';
import TokenAmountInput from 'shared/lib/components/common/TokenAmountInput';
import { GNFormat } from 'shared/lib/data/GoodNumber';
import { UniswapV3PoolBasics, fetchUniswapPoolBasics } from 'shared/lib/data/Uniswap';
import useChain from 'shared/lib/hooks/UseChain';
import useEffectOnce from 'shared/lib/hooks/UseEffectOnce';
import { numericPriceRatioGN, roundDownToNearestN, roundUpToNearestN } from 'shared/lib/util/Numbers';
import { Address } from 'viem';
import { Config, useClient } from 'wagmi';

import { getAddLiquidityActionArgs } from '../../../data/actions/ActionArgs';
import { ActionID } from '../../../data/actions/ActionID';
import { addLiquidityOperator } from '../../../data/actions/ActionOperators';
import { ActionCardProps, ActionProviders } from '../../../data/actions/Actions';
import { useEthersProvider } from '../../../util/Provider';
import {
  calculateAmount0FromAmount1,
  calculateAmount1FromAmount0,
  calculateTickData,
  calculateTickInfo,
  getPoolAddressFromTokens,
  priceToClosestTick,
  shouldAmount0InputBeDisabled,
  shouldAmount1InputBeDisabled,
  TickData,
  tickToPrice,
} from '../../../util/Uniswap';
import TokenChooser from '../../common/TokenChooser';
import { BaseActionCard } from '../BaseActionCard';
import LiquidityChart, { ChartEntry } from '../uniswap/LiquidityChart';
import { LiquidityChartPlaceholder } from '../uniswap/LiquidityChartPlaceholder';
import SteppedInput from '../uniswap/SteppedInput';

const MIN_TICK = TickMath.MIN_TICK;
const MAX_TICK = TickMath.MAX_TICK;

type PreviousState = {
  amount0Str: string;
  amount1Str: string;
  lowerStr: string;
  upperStr: string;
  isToken0Selected: boolean;
};

function fromFields(fields: string[] | undefined): PreviousState {
  return {
    amount0Str: fields?.at(0) ?? '',
    amount1Str: fields?.at(1) ?? '',
    lowerStr: fields?.at(2) ?? '',
    upperStr: fields?.at(3) ?? '',
    isToken0Selected: fields?.at(4) !== 'false',
  };
}

export default function UniswapAddLiquidityActionCard(props: ActionCardProps) {
  const { marginAccount, accountState, userInputFields, isCausingError, errorMsg, onChange, onRemove } = props;
  const { token0, token1, feeTier } = marginAccount;
  const activeChain = useChain();

  // MARK: state for user inputs
  const [localIsAmount0UserDefined, setLocalIsAmount0UserDefined] = useState(false);
  const [localTokenAmounts, setLocalTokenAmounts] = useState<readonly [string, string]>(['', '']);
  const [localLiquidity, setLocalLiquidity] = useState<JSBI>(JSBI.BigInt(0));

  // MARK: wagmi hooks
  const client = useClient<Config>();
  const provider = useEthersProvider(client);

  // MARK: chart data and other fetched state
  const [uniswapPoolBasics, setUniswapPoolBasics] = useState<UniswapV3PoolBasics | null>(null);
  const [liquidityData, setLiquidityData] = useState<TickData[] | null>(null);
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [chartLoading, setChartLoading] = useState(true);

  // MARK: pre-compute some useful stuff
  const poolAddress = getPoolAddressFromTokens(token0, token1, feeTier, activeChain.id);
  const {
    isToken0Selected,
    amount0Str: previousAmount0Str,
    amount1Str: previousAmount1Str,
    lowerStr: previousLowerStr,
    upperStr: previousUpperStr,
  } = fromFields(userInputFields);
  // --> if uniswapPoolBasics exists, do some extra math upfront (helps us later)
  const tickInfo =
    (uniswapPoolBasics && calculateTickInfo(uniswapPoolBasics, token0, token1, isToken0Selected)) ?? null;
  // --> ticks
  const currentTick = (uniswapPoolBasics && uniswapPoolBasics.slot0.tick) ?? null;
  let previousLower: number | null = null;
  let previousUpper: number | null = null;
  if (previousLowerStr !== '' && previousUpperStr !== '') {
    previousLower = parseFloat(previousLowerStr);
    previousUpper = parseFloat(previousUpperStr);
  } else if (tickInfo != null && currentTick != null) {
    // If user hasn't entered their own lower and upper bounds, initialize them with a reasonable default.
    // Note that we can't do this until we've fetched tick info.
    previousLower = roundDownToNearestN(currentTick - 10 * tickInfo.tickSpacing, tickInfo.tickSpacing);
    previousUpper = roundUpToNearestN(currentTick + 10 * tickInfo.tickSpacing, tickInfo.tickSpacing);
  }
  // --> disabled status
  let isInput0Disabled = true;
  let isInput1Disabled = true;
  if (previousLower != null && previousUpper != null && currentTick != null) {
    isInput0Disabled = shouldAmount0InputBeDisabled(previousLower, previousUpper, currentTick);
    isInput1Disabled = shouldAmount1InputBeDisabled(previousLower, previousUpper, currentTick);
  }

  // TODO is this necessary IN ADDITION to the localTokenAmounts update hook?
  // if (isOutputStale) callbackWithFullResults()

  // If localTokenAmounts aren't up-to-date, overwrite with previousAmountsStr
  useEffect(() => {
    if (localTokenAmounts[0] !== previousAmount0Str || localTokenAmounts[1] !== previousAmount1Str) {
      setLocalTokenAmounts([previousAmount0Str, previousAmount1Str]);
    }
  }, [previousAmount0Str, previousAmount1Str, localTokenAmounts]);

  // Fetch (a) uniswapPoolBasics from ethers and (b) liquidityData from TheGraph
  useEffectOnce(() => {
    let mounted = true;
    async function fetch(poolAddress: string) {
      if (!provider) return;
      const poolBasics = await fetchUniswapPoolBasics(poolAddress, provider);
      if (mounted) {
        setUniswapPoolBasics(poolBasics);
      }
      const tickData = await calculateTickData(poolAddress, poolBasics, activeChain.id);
      if (mounted) {
        setLiquidityData(tickData);
      }
    }
    fetch(poolAddress);
    return () => {
      mounted = false;
    };
  });

  // Once liquidityData has been fetched, arrange/format it to be workable chartData
  useEffect(() => {
    if (liquidityData == null) return;

    const _liquidityData = liquidityData.concat();
    if (!isToken0Selected) _liquidityData.reverse();

    const _chartData = _liquidityData.map((td: TickData) => {
      return { price: isToken0Selected ? td.price0In1 : td.price1In0, liquidityDensity: td.totalValueIn0 };
    });
    setChartData(_chartData);
    setChartLoading(false);
  }, [liquidityData, isToken0Selected]);

  /**
   * Applies Uniswap V3 math to update one of the token amounts whenever the user changes position bounds.
   * Whichever amount the user last touched will be held constant, *unless* doing so would result in inf
   * in the other value.
   *
   * @param value The new position bound (should be an integer with %tickSpacing === 0)
   * @param isLower Whether `value` should be assigned to the lower or upper bound
   */
  function updateTick(value: number, isLower: boolean) {
    if (isLower && previousUpper != null && value >= previousUpper) {
      console.error('Attempted to place lower bound above upper bound');
      return;
    }
    if (!isLower && previousLower != null && value <= previousLower) {
      console.error('Attempted to place upper bound below lower bound');
      return;
    }

    const lower = isLower ? value : previousLower;
    const upper = isLower ? previousUpper : value;

    if (lower != null && upper != null && currentTick != null) {
      if (shouldAmount0InputBeDisabled(lower, upper, currentTick)) {
        callbackWithFullResults(isToken0Selected, '', localTokenAmounts[1], lower, upper);
        setLocalIsAmount0UserDefined(false);
        return;
      }
      if (shouldAmount1InputBeDisabled(lower, upper, currentTick)) {
        callbackWithFullResults(isToken0Selected, localTokenAmounts[0], '', lower, upper);
        setLocalIsAmount0UserDefined(true);
        return;
      }
    }

    const userDefinedAmount = localTokenAmounts[localIsAmount0UserDefined ? 0 : 1];
    updateAmount(userDefinedAmount, localIsAmount0UserDefined, lower, upper);
  }

  /**
   * Applies Uniswap V3 math to update both token amounts whenever the user changes one of them. Optionally reports
   * results to the parent context, depending on `shouldCallback`.
   *
   * @param amountXStr The given amount (the one most recently edited by the user)
   * @param isToken0 Whether the given amount is an amount of token0 or token1
   * @param lower The lower bound of the Uniswap Position we're trying to create
   * @param upper The upper bound of the Uniswap Position we're trying to create
   * @param shouldCallback Whether to report results to the parent context
   *
   * @dev `currentTick`, `token0`, `token1`, and `isToken0Selected` must be properly defined **before** this function.
   */
  function updateAmount(amountXStr: string, isToken0: boolean, lower: number | null, upper: number | null) {
    const amountX = parseFloat(amountXStr);

    // If any of these ticks are null, we don't have enough information
    // to compute amountY from amountX. We can return early.
    if (lower == null || upper == null || currentTick == null) return;

    let amountYStr = isToken0 ? previousAmount1Str : previousAmount0Str;
    let liquidity = JSBI.BigInt('0');
    // If possible, compute amountY from amountX
    if (!isNaN(amountX) && amountX > 0) {
      const res = (isToken0 ? calculateAmount1FromAmount0 : calculateAmount0FromAmount1)(
        amountX,
        lower,
        upper,
        currentTick,
        token0.decimals,
        token1.decimals
      );
      amountYStr = res.amount;
      liquidity = res.liquidity;
    } else {
      amountYStr = '';
    }

    const [amount0Str, amount1Str] = isToken0 ? [amountXStr, amountYStr] : [amountYStr, amountXStr];

    setLocalTokenAmounts([amount0Str, amount1Str]);
    setLocalIsAmount0UserDefined(isToken0);
    setLocalLiquidity(liquidity);

    callbackWithFullResults(isToken0Selected, amount0Str, amount1Str, lower, upper, liquidity);
  }

  function callbackWithFullResults(
    isToken0Selected: boolean,
    amount0Str: string,
    amount1Str: string,
    lowerTick: number | null,
    upperTick: number | null,
    liquidity = JSBI.BigInt('0')
  ) {
    onChange(
      {
        actionId: ActionID.ADD_LIQUIDITY,
        actionArgs:
          lowerTick !== null && upperTick !== null
            ? getAddLiquidityActionArgs(lowerTick, upperTick, liquidity)
            : undefined,
        operator(operand) {
          if (lowerTick == null || upperTick == null || currentTick == null) {
            throw Error('Specify position bounds before adding liquidity');
          }
          return addLiquidityOperator(
            operand,
            marginAccount.address as Address,
            liquidity,
            lowerTick,
            upperTick,
            currentTick,
            token0.decimals,
            token1.decimals
          );
        },
      },
      [amount0Str, amount1Str, lowerTick?.toFixed(0) ?? '', upperTick?.toFixed(0) ?? '', String(isToken0Selected)]
    );
  }

  let max0 = accountState.assets.token0Raw;
  let max1 = accountState.assets.token1Raw;
  // If token1 is selected, we need to swap the max amounts
  if (!isToken0Selected) [max0, max1] = [max1, max0];
  const maxString0 = max0.toString(GNFormat.DECIMAL);
  const maxString1 = max1.toString(GNFormat.DECIMAL);

  const ticksAreDefined = previousLower != null && previousUpper != null && currentTick != null;
  const tickIncrement = (tickInfo && (isToken0Selected ? tickInfo.tickSpacing : -tickInfo.tickSpacing)) ?? null;

  let prices: number[] | null = null;
  if (ticksAreDefined) {
    prices = [
      numericPriceRatioGN(tickToPrice(previousLower!), token0.decimals, token1.decimals, !isToken0Selected),
      numericPriceRatioGN(tickToPrice(previousUpper!), token0.decimals, token1.decimals, !isToken0Selected),
    ].sort((a, b) => a - b);
  }

  const lowerSteppedInput = (
    <SteppedInput
      value={
        previousLower == null
          ? ''
          : numericPriceRatioGN(
              tickToPrice(previousLower),
              token0.decimals,
              token1.decimals,
              !isToken0Selected
            ).toString()
      }
      label={isToken0Selected ? 'Min Price' : 'Max Price'}
      token0={token0}
      token1={token1}
      isToken0Selected={isToken0Selected}
      onChange={(value) => {
        let price = parseFloat(value);
        if (isNaN(price) || price === 0 || tickInfo == null || previousUpper == null) return;

        if (!isToken0Selected) price = 1.0 / price;
        const nearestTick = roundDownToNearestN(
          priceToClosestTick(price, token0.decimals, token1.decimals),
          tickInfo.tickSpacing
        );

        if (nearestTick < previousUpper && nearestTick >= MIN_TICK) {
          updateTick(nearestTick, true);
        }
      }}
      onDecrement={() => {
        if (tickIncrement && previousLower != null) updateTick(previousLower - tickIncrement, true);
      }}
      onIncrement={() => {
        if (tickIncrement && previousLower != null) updateTick(previousLower + tickIncrement, true);
      }}
      decrementDisabled={
        !tickIncrement ||
        !ticksAreDefined ||
        previousLower! - tickIncrement >= previousUpper! ||
        previousLower! - tickIncrement < MIN_TICK
      }
      incrementDisabled={
        !tickIncrement ||
        !ticksAreDefined ||
        previousLower! + tickIncrement >= previousUpper! ||
        previousLower! + tickIncrement < MIN_TICK
      }
      disabled={poolAddress == null}
    />
  );

  const upperSteppedInput = (
    <SteppedInput
      value={
        previousUpper == null
          ? ''
          : numericPriceRatioGN(
              tickToPrice(previousUpper),
              token0.decimals,
              token1.decimals,
              !isToken0Selected
            ).toFixed(18)
      }
      label={isToken0Selected ? 'Max Price' : 'Min Price'}
      token0={token0}
      token1={token1}
      isToken0Selected={isToken0Selected}
      onChange={(value) => {
        let price = parseFloat(value);
        if (isNaN(price) || price === 0 || tickInfo == null || previousLower == null) return;

        if (!isToken0Selected) price = 1.0 / price;
        const nearestTick = roundUpToNearestN(
          priceToClosestTick(price, token0.decimals, token1.decimals),
          tickInfo.tickSpacing
        );

        if (nearestTick > previousLower && nearestTick <= MAX_TICK) {
          updateTick(nearestTick, false);
        }
      }}
      onDecrement={() => {
        if (tickIncrement && previousUpper != null) updateTick(previousUpper - tickIncrement, false);
      }}
      onIncrement={() => {
        if (tickIncrement && previousUpper != null) updateTick(previousUpper + tickIncrement, false);
      }}
      decrementDisabled={
        !tickIncrement ||
        !ticksAreDefined ||
        previousUpper! - tickIncrement <= previousLower! ||
        previousUpper! - tickIncrement > MAX_TICK
      }
      incrementDisabled={
        !tickIncrement ||
        !ticksAreDefined ||
        previousUpper! + tickIncrement <= previousLower! ||
        previousUpper! + tickIncrement > MAX_TICK
      }
      disabled={poolAddress == null}
    />
  );

  // We need to swap the token amounts if token1 is selected
  const tokenAmount0 = localTokenAmounts[isToken0Selected ? 0 : 1];
  const tokenAmount1 = localTokenAmounts[isToken0Selected ? 1 : 0];

  return (
    <BaseActionCard
      action={ActionID.ADD_LIQUIDITY}
      actionProvider={ActionProviders.UniswapV3}
      isCausingError={isCausingError}
      errorMsg={errorMsg}
      onRemove={onRemove}
    >
      <div className='w-full flex justify-between items-center gap-2 mb-4'>
        {token0 && token1 && (
          <TokenChooser
            token0={token0}
            token1={token1}
            isToken0Selected={isToken0Selected}
            setIsToken0Selected={(value: boolean) => {
              callbackWithFullResults(
                value,
                previousAmount0Str,
                previousAmount1Str,
                previousLower,
                previousUpper,
                localLiquidity
              );
            }}
          />
        )}
      </div>
      {chartData.length === 0 && !chartLoading ? null : chartData.length === 0 || !ticksAreDefined ? (
        <LiquidityChartPlaceholder />
      ) : (
        <LiquidityChart
          data={chartData}
          rangeStart={prices![0]}
          rangeEnd={prices![1]}
          currentPrice={numericPriceRatioGN(
            tickToPrice(currentTick),
            token0.decimals,
            token1.decimals,
            !isToken0Selected
          )}
        />
      )}
      <div className='flex flex-row gap-2 mb-4'>
        {isToken0Selected ? lowerSteppedInput : upperSteppedInput}
        {isToken0Selected ? upperSteppedInput : lowerSteppedInput}
      </div>
      <div className='w-full flex flex-col gap-4'>
        <TokenAmountInput
          token={isToken0Selected ? token0 : token1}
          value={isInput0Disabled ? '' : tokenAmount0}
          onChange={(value) => updateAmount(value, isToken0Selected, previousLower, previousUpper)}
          disabled={isInput0Disabled}
          max={maxString0}
          maxed={tokenAmount0 === maxString0}
          onMax={(maxValue: string) => {
            //When max is clicked, we want to forcefully update the amount inputs so we handle it ourselves
            updateAmount(maxValue, isToken0Selected, previousLower, previousUpper);
          }}
        />
        <TokenAmountInput
          token={isToken0Selected ? token1 : token0}
          value={isInput1Disabled ? '' : tokenAmount1}
          onChange={(value) => updateAmount(value, !isToken0Selected, previousLower, previousUpper)}
          disabled={isInput1Disabled}
          max={maxString1}
          maxed={tokenAmount1 === maxString1}
          onMax={(maxValue: string) => {
            //When max is clicked, we want to forcefully update the amount inputs so we handle it ourselves
            updateAmount(maxValue, !isToken0Selected, previousLower, previousUpper);
          }}
        />
      </div>
    </BaseActionCard>
  );
}

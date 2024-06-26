import { ReactElement } from 'react';

import useMediaQuery from '../../hooks/UseMediaQuery';

export type MediaQueryProps = {
  children: ReactElement;
  minWidth: number;
};

export default function MediaQuery(props: MediaQueryProps) {
  const { children, minWidth } = props;
  const matches = useMediaQuery(minWidth);
  return matches ? children : null;
}

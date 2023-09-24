import { Dna } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderWrapper>
      <Dna />
    </LoaderWrapper>
  );
}

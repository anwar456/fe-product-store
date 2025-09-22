import styled from 'styled-components';

const DFlex = styled.div`
  display: flex !important;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const DFlexJustifyBetween = styled(DFlex)`
  justify-content: space-between !important;
  align-items: center;
`;

const DFlexAlignItemsStart = styled.div`
  display: flex !important;
  align-items: start;
`;

const DFlexJustifyStart = styled(DFlex)`
  justify-content: flex-start !important;
`;

const DFlexJustifyEnd = styled(DFlex)`
  justify-content: flex-end !important;
`;

export const DFlexALignCenter = styled(DFlex)`
  align-items: center;
`;
export const DFLexCenterBetween = styled(DFlex)`
  align-items: center;
  justify-content: space-between;
`;

export const DFLexEndBetween = styled(DFlex)`
  align-items: end;
  justify-content: space-between;
`;

const DFlexColumn = styled(DFlex)`
  flex-direction: column;
  align-items: flex-start;
`;

export {
  DFlex,
  DFlexAlignItemsStart,
  DFlexColumn,
  DFlexJustifyBetween,
  DFlexJustifyEnd,
  DFlexJustifyStart,
};

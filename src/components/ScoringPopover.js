import { Button, Popover } from 'antd';
import { useMemo, useState } from 'react';
import ScoringTable from './ScoringTable';
const text = <span alignText="center">Scoring System</span>;
const content = (
  <div>
    {<ScoringTable />}
  </div>
);
const buttonWidth = 70;
const ScoringPopover = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const mergedArrow = useMemo(() => {
    if (arrowAtCenter)
      return {
        arrowPointAtCenter: true,
      };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
  return (
    <div className="demo">
      <div
        style={{
          width: buttonWidth,
          float: 'left',
        }}
      >
        <Popover placement="rightTop" title={text} content={content} arrow={mergedArrow}>
          <Button placement='rightTop'>Scoring System</Button>
        </Popover>
      </div>
    </div>
  );
};
export default ScoringPopover;
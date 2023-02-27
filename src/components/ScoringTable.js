// import { Card } from 'antd';
// const gridStyle = {
//   width: '45%',
//   height:'20px',
//   textAlign: 'center',
//   padding:'20px'
  
// };
// const ScoringTable = () => (
//   <Card title="Scoring System" style={{marginTop:'50px'}}>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       Attribute
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       Score
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       Oustanding
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       5
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       Exceeds Requirements
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       4
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       Meets Requirements
//     </Card.Grid><Card.Grid hoverable={false} style={gridStyle}>
//       3
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       Need Improvement
//     </Card.Grid><Card.Grid hoverable={false} style={gridStyle}>
//       2
//     </Card.Grid>
//     <Card.Grid hoverable={false} style={gridStyle}>
//       Unsatisfactory
//     </Card.Grid><Card.Grid hoverable={false} style={gridStyle}>
//       1
//     </Card.Grid>
//   </Card>
// );
// export default ScoringTable;



import { Table } from 'antd';
const columns = [
  {
    title: 'Attribute',
    dataIndex: 'attribute',
    align:'center',
    render: (text) => <>{text}</>,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    align: 'center',
  },
];
const data = [
  {
    key: '1',
    attribute: 'Outstanding',
    score: '5',
    className:'scoring-table-data',
  },
  {
    key: '2',
    attribute: 'Exceed Requirements',
    score: '4',
    className:'scoring-table-data',
  },
  {
    key: '3',
    attribute: 'Meets Requirements',
    score: '3',
    className:'scoring-table-data',
  },
  {
    key: '4',
    attribute: 'Need Improvement',
    score: '2',
    className:'scoring-table-data',
  },
  {
    key: '5',
    attribute: 'Unsatisfactory',
    score: '1',
    className:'scoring-table-data',
  },
  
];
const ScoringTable = () => (
  <Table size='small' style={{marginTop:'50px',className:'scoring-table'}}
    columns={columns}
    dataSource={data}
    bordered
    title={() => 'Scoring System'}
    pagination={false}
    
  />
);
export default ScoringTable;
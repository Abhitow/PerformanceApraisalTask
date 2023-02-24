import {  Table} from 'antd';
const columns = [
  {
    title: 'Attribute',
    dataIndex: 'attribute',
    key: 'attribute',
    render: (text) => <>{text}</>,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  }, 
];
const data = [
  {
    key: '1',
    attribute: 'Outstanding',
    score: 5,
  },
  {
    key: '2',
    attribute: 'Exceeds Requirements',
    score: 4,
  },
  {
    key: '3',
    attribute: 'Meets Requirements',
    score: 3,
  },
  {
    key: '4',
    attribute: 'Need Improvement',
    score: 2,
  },
  {
    key: '5',
    attribute: 'Unsatisfactory',
    score: 1,
  },
  
];
const ScoringTable = () => <Table columns={columns} dataSource={data} pagination={false}/>;
export default ScoringTable;
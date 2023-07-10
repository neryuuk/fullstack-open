import Part from './Part';

const Content = ({ parts }) => (<>
  {parts.map(part => <Part {...part} key={part.id} />)}
</>)

export default Content

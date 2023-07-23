export const Toast = ({ message, type }) => {
  if (!message) return <></>
  return <div className={`toast ${type}`}>{message}</div>
}

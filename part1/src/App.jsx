const App = () => {
  const friends = ['Peter', 4, 'Maya', 10]

  return (
    <div className="App">
      <h1>Greetings</h1>
      <p>{friends.join(', ')}</p>
    </div>
  )
}

export default App

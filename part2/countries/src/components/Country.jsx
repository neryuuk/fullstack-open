const Country = ({ data }) => <>
  <h2>{data.name.common}</h2>
  <p>capital {data.capital.join(', ')}</p>
  <p>area {data.area}</p>
  <h3>Languages:</h3>
  <ul>{Object.values(data.languages).map(lang =>
    <li key={lang}>{lang}</li>
  )}</ul>
  <img src={data.flags.png} alt={data.flags.alt} title={data.flags.alt} />
</>

export default Country

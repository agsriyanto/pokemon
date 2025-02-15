import "./baseStatus.scss";
import { DetailPokemon } from "../../types";
import { formattedName } from "../../hooks";

const BaseStatus = (props: DetailPokemon) => {
  const { pokemon } = props;

  const totalStats = Array.isArray(pokemon?.stats) 
    ? pokemon.stats.reduce((total: number, item: any) => total + (item?.value ?? 0), 0)
    : 0;
  const totalValue = pokemon.stats.length * 100;

  return (
    <div className="base-status">
      {pokemon?.stats.map((stat: any) => (
        <div className="stat-row" key={stat.name} >
          <p className="stat-name">{stat.name}</p>
          <p className="stat-value">{stat.value}</p>
          <div className="stat-bar">
            <div
              className={`bar ${stat.value < 50 ? "low" : "high"}`}
              style={{ width: `${(stat.value / 100) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <div className="stat-row">
        <p className="stat-name">Total</p>
        <p className="stat-value">{totalStats}</p>
        <div className="stat-bar">
          <div
            className={`bar ${totalStats < (totalValue / 2) ? "low" : "high"}`}
            style={{ width: `${(totalStats / totalValue) * 100}%` }}
          />
        </div>
      </div>

      <p className="title-type">Type defenses</p>
      <p className="type-description">The effectiveness of each type on {formattedName(pokemon.name)}</p>
    </div>
  )
};

export default BaseStatus;
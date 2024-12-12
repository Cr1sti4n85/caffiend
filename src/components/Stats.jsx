import {
  calculateCoffeeStats,
  calculateCurrentCaffeineLevel,
  coffeeConsumptionHistory,
  statusLevels,
} from "../utils";

function StatCard(props) {
  const { lg, title, children } = props;
  return (
    <div className={"card stat-card " + (lg ? "col-span-2" : "")}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
function Stats() {
  const stats = calculateCoffeeStats(coffeeConsumptionHistory);

  const caffeineLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory);

  const warningLevel =
    caffeineLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeineLevel < statusLevels["moderate"].maxLevel
      ? "moderate"
      : "high";

  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-chart-simple"></i>
        <h2>Stats</h2>
      </div>
      <div className="stats-grid">
        <StatCard title="Active Caffeine Level" lg>
          <div className="status">
            <p>
              <span className="stat-text">{caffeineLevel}</span>mg
            </p>
            <h5
              style={{
                color: statusLevels[warningLevel].color,
                background: statusLevels[warningLevel].background,
              }}
            >
              Low
            </h5>
          </div>
          <p>{statusLevels[warningLevel].description}</p>
        </StatCard>
        <StatCard title="Daily Caffeine">
          <p>
            <span className="stat-text">{stats.dailyCaffeine}</span>mg
          </p>
        </StatCard>
        <StatCard title="Avg number of Coffees">
          <p>
            <span className="stat-text">{stats.averageCoffees}</span>
          </p>
        </StatCard>
        <StatCard title="Daily Cost ($)">
          <p>
            $ <span className="stat-text">{stats.dailyCost}</span>
          </p>
        </StatCard>
        <StatCard title="Total Cost ($)">
          <p>
            $ <span className="stat-text">{stats.totalCost}</span>
          </p>
        </StatCard>
      </div>
    </>
  );
}

export default Stats;

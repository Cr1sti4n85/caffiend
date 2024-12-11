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
              <span></span>
            </p>
          </div>
        </StatCard>
        <StatCard title="Daily Caffeine"></StatCard>
        <StatCard title="Avg number of Coffees"></StatCard>
        <StatCard title="Daily Cost ($)"></StatCard>
        <StatCard title="Total Cost ($)"></StatCard>
      </div>
    </>
  );
}

export default Stats;

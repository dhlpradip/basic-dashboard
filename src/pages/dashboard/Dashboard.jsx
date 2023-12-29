import { useContext, useEffect, useState } from "react";
import "../../styles/dashboard.css";
import { DataContext } from "../../context/dataContext";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell
} from "recharts";

const Dashboard = () => {
  const [subCount, setSubCount] = useState();
  const { users, subscriptions } = useContext(DataContext);

  const cardColors = [
    "#ffcccc",
    "#ccffcc",
    "#ccccff",
    "#ffffcc",
    "#ffccff",
    "#ccffff",
  ];

  useEffect(() => {
    if (users) {
      if (subscriptions) {
        const subscriptionCount = subscriptions.reduce((acc, entry) => {
          const { package: packageName } = entry;
          acc[packageName] = (acc[packageName] || 0) + 1;
          return acc;
        }, {});

        const subscriptionCountArray = Object.entries(subscriptionCount).map(
          ([name, count]) => ({
            name,
            count,
          })
        );

        const sortedHigestSubbedPackages = subscriptionCountArray.sort(
          (a, b) => b.count - a.count
        );
        setSubCount(sortedHigestSubbedPackages);
      }
    }
  }, [subscriptions, users]);

  console.log({ subCount });

  if (!subCount) {
    return "Loading..";
  }

  return (
    <>
      <div className="top-bar">
        <h3>Dashboard</h3>
      </div>
      <div className="main-content">
        <p className="header-text">Subscription Summary</p>
        <div className="grid-container-dashboard">
          {subCount.map((item, index) => (
            <div
              className="card-dashboard"
              key={index}
              style={{
                backgroundColor: cardColors[index % cardColors.length], // Use modulo to cycle through colors
              }}
            >
              <h4>{item.name}</h4>
              <h1>{item.count}</h1>
              <h5>Subscriptions</h5>
            </div>
          ))}
        </div>
        <div>
          <div className="chart-section">
            <p className="header-text">Summary In Charts</p>
            <div className="chart-display">
              <div className="card-dashboard">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={subCount}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#82ca9d"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="card-dashboard">
              <PieChart width={500} height={300}>
              <Pie
            data={subCount}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
          >
            {subCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cardColors[index % cardColors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

// 🔗 Replace with your Azure Function API
//const API_URL = "https://YOUR_BACKEND_URL/data";
const API_URL = "http://192.168.1.112:5000/data";
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getRecommendation = (value) => {
    if (value > 15) return "📈 Strong Buy";
    if (value > 5) return "👍 Hold";
    if (value < -10) return "⚠️ Review";
    return "🔍 Watch";
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Investment Dashboard</Text>

      {/* Summary */}
      <View style={styles.card}>
        <Text style={styles.title}>💰 Portfolio Summary</Text>
        <Text>Total Value: ${data.totalValue}</Text>
        <Text>Return: {data.return}%</Text>
      </View>

      {/* Top 10 */}
      <View style={styles.card}>
        <Text style={styles.title}>🏆 Top Performers</Text>
        {data.top10.map((item, index) => (
          <Text key={index}>
            {item.ticker} → {item.return}% ({getRecommendation(item.return)})
          </Text>
        ))}
      </View>

      {/* Semiconductor Chart */}
      <View style={styles.card}>
        <Text style={styles.title}>⚡ Semiconductor Trend</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{ data: data.semiTrend }]
          }}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(26,255,146, ${opacity})`,
          }}
        />
      </View>

      {/* Gold vs Silver */}
      <View style={styles.card}>
        <Text style={styles.title}>🪙 Gold vs Silver</Text>
        <Text>Gold: {data.gold}</Text>
        <Text>Silver: {data.silver}</Text>
      </View>

      {/* AI Insights */}
      <View style={styles.card}>
        <Text style={styles.title}>🤖 AI Insights</Text>
        <Text>{data.aiInsight}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 10 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" }
});
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { chat } from "@stuba/api-client";
import { ChatResponse } from "@stuba/contracts";
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ChatResponse | null>(null);

  const submit = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);
    try {
      const data = await chat(query);
      setResponse(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>RAG Chat (Mobile)</Text>
      <Text style={styles.subtitle}>Uses shared API client + Fastify + FastAPI stub</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask me something..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={submit}
        />
        <TouchableOpacity style={styles.button} disabled={loading || !query.trim()} onPress={submit}>
          <Text style={styles.buttonText}>{loading ? "..." : "Ask"}</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {response && (
        <ScrollView style={styles.card} contentContainerStyle={{ paddingBottom: 32 }}>
          <Text style={styles.sectionTitle}>Answer</Text>
          <Text style={styles.paragraph}>{response.answer}</Text>
          <Text style={styles.meta}>Latency: {response.latency_ms.toFixed(1)} ms</Text>
          <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Citations</Text>
          {response.citations.map((c) => (
            <View key={c.doc_id} style={styles.citation}>
              <Text style={styles.citationTitle}>{c.title}</Text>
              <Text style={styles.citationSnippet}>{c.snippet}</Text>
              <Text style={styles.meta}>Score: {c.score.toFixed(3)}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7fb",
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  subtitle: {
    color: "#555",
    marginTop: 4,
    marginBottom: 12
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16
  },
  button: {
    backgroundColor: "#111827",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontWeight: "700"
  },
  error: {
    color: "red",
    marginTop: 12
  },
  card: {
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee"
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 18
  },
  paragraph: {
    marginTop: 6,
    fontSize: 16,
    color: "#333"
  },
  meta: {
    color: "#777",
    marginTop: 4
  },
  citation: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fafafa"
  },
  citationTitle: {
    fontWeight: "700",
    marginBottom: 4
  },
  citationSnippet: {
    color: "#444"
  }
});

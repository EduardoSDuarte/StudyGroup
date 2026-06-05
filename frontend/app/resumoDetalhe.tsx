import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function ResumoDetalhe() {
  const [excluindo, setExcluindo] = useState(false);

  const handleExcluir = async () => {
    Alert.alert(
      "Excluir resumo",
      "Tem certeza que deseja excluir este resumo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setExcluindo(true);
            try {
              await api.delete("/summary/delete");
              Alert.alert("Sucesso", "Resumo excluído!", [
                { text: "OK", onPress: () => router.back() }
              ]);
            } catch (error: any) {
              Alert.alert("Erro", "Não foi possível excluir o resumo. Tente novamente!");
            } finally {
              setExcluindo(false);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
        Resumo 📖
      </Text>
      <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 20 }}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
          Introdução aos Grafos
        </Text>
        <Text style={{ color: "#ccc", lineHeight: 22 }}>
          Grafos são estruturas compostas por vértices e arestas. São utilizados para modelar redes, mapas, conexões e diversos problemas computacionais.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/comentarios")}
        style={{ backgroundColor: "#4F7CFF", padding: 15, borderRadius: 12, marginBottom: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Ver Comentários</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleExcluir}
        disabled={excluindo}
        style={{ backgroundColor: "#E74C3C", padding: 15, borderRadius: 12, marginTop: 10 }}
      >
        {excluindo ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>🗑️ Excluir Resumo</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
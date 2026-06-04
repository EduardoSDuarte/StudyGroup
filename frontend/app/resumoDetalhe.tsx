import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ResumoDetalhe() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1E4D",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#4F7CFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Resumo 📖
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Introdução aos Grafos
        </Text>

        <Text
          style={{
            color: "#ccc",
            lineHeight: 22,
          }}
        >
          Grafos são estruturas compostas por vértices e arestas. São utilizados
          para modelar redes, mapas, conexões e diversos problemas
          computacionais.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/comentarios")}
        style={{
          backgroundColor: "#4F7CFF",
          padding: 15,
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Ver Comentários
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#E74C3C",
          padding: 15,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          🗑️ Excluir Resumo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

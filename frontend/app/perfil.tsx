import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
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
          marginBottom: 25,
        }}
      >
        Perfil 👤
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 25,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Pietra Bezerra
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 8,
          }}
        >
          pietra@email.com
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          ⏱️ Horas estudadas este mês
        </Text>

        <Text
          style={{
            color: "#4F7CFF",
            fontSize: 22,
            marginTop: 10,
          }}
        >
          48h 32min
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          🏆 Melhor posição
        </Text>

        <Text
          style={{
            color: "#FFD700",
            fontSize: 22,
            marginTop: 10,
          }}
        >
          1º Lugar
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          📈 Histórico de Ranking
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 10,
          }}
        >
          Maio/2026 - 2º Lugar
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Junho/2026 - 1º Lugar
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/editarPerfil")}
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
          Editar Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/excluirConta")}
        style={{
          backgroundColor: "#E74C3C",
          padding: 15,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          🗑️ Excluir Conta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

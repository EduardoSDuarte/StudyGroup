import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function Resumos() {
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
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Resumos 📝
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/resumoDetalhe")}
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
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Matemática Discreta
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Adicionado por Nique
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/resumoDetalhe")}
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
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Estrutura de Dados
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Adicionado por Pietra
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/novoResumo")}
        style={{
          borderWidth: 1,
          borderColor: "#4F7CFF",
          borderStyle: "dashed",
          padding: 20,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: "#4F7CFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          + Adicionar Resumo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

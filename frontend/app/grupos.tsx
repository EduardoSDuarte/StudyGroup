import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function Grupos() {
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
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        Meus Grupos 📚
      </Text>

      {/* Grupo existente */}
      <TouchableOpacity
        onPress={() => router.push("/grupo")}
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
          Os Feras
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          4 membros
        </Text>
      </TouchableOpacity>

      {/* Criar Grupo */}
      <TouchableOpacity
        onPress={() => router.push("/novoGrupo")}
        style={{
          backgroundColor: "#4F7CFF",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          + Criar Grupo
        </Text>
      </TouchableOpacity>

      {/* Entrar em Grupo */}
      <TouchableOpacity
        onPress={() => router.push("/entrarGrupo")}
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
          + Entrar em Grupo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Membros() {
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
          marginBottom: 30,
        }}
      >
        Membros 👥
      </Text>

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
            color: "#FFD700",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          👑 Pietra Bezerra
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Administradora
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
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          👤 Nique
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Membro
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
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          👤 João
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Membro
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/solicitacoes")}
        style={{
          backgroundColor: "#9B59B6",
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
          📥 Solicitações
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
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
          + Convidar Membro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#2ECC71",
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
          🔗 Gerar Link de Convite
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#F39C12",
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
          👑 Transferir Administração
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/denunciarUsuario")}
        style={{
          backgroundColor: "#C0392B",
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
          🚨 Denunciar Usuário
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/removerMembro")}
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
          ❌ Remover Membro
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

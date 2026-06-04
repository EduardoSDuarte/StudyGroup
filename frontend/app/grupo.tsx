import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Grupo() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 40, marginBottom: 20 }}
      >
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>
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
        Os Feras 📚
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          🏆 Ranking Atual
        </Text>

        <Text style={{ color: "#FFD700" }}>🥇 Nique — 02:15:30</Text>

        <Text style={{ color: "#C0C0C0", marginTop: 5 }}>
          🥈 Pietra — 01:48:12
        </Text>
      </View>

      {/* Linha 1 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/home")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>⏱️</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Cronômetro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/resumos")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>📝</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Resumos</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 2 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/lembretes")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>📌</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Lembretes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/rankingDiario")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>🏆</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Ranking Dia</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 3 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/rankingMensal")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>📊</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Ranking Mês</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/membros")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>👥</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Membros</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 4 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/chamada")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>📞</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Chamada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/perfil")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>👤</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 5 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/agenda")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>📅</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Agenda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/modoFoco")}
          style={{
            backgroundColor: "#1D2F6F",
            width: "48%",
            padding: 25,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>🎯</Text>
          <Text style={{ color: "white", marginTop: 8 }}>Modo Foco</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 6 */}
      <TouchableOpacity
        onPress={() => router.push("/notificacoes")}
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>🔔 Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/editarGrupo")}
        style={{
          backgroundColor: "#F39C12",
          padding: 15,
          borderRadius: 12,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          ✏️ Editar Grupo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#E67E22",
          padding: 15,
          borderRadius: 12,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          🚪 Sair do Grupo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#E74C3C",
          padding: 15,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          🗑️ Excluir Grupo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

import { router } from "expo-router";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Comentarios() {
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
        Comentários 💬
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 15,
          borderRadius: 15,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>João</Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Excelente resumo!
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 15,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Pietra</Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          Gostei da explicação sobre vértices.
        </Text>
      </View>

      <TextInput
        placeholder="Adicionar comentário"
        placeholderTextColor="#999"
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#4F7CFF",
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
          Comentar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

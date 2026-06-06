// services/groupContext.ts
// Armazena o groupId e groupName do grupo selecionado em memória durante a sessão.
// Como o Expo Router não tem um store global nativo, usamos um objeto simples exportado.
// Isso funciona enquanto o app estiver aberto — ao reabrir, reseta automaticamente.

let _groupId: string = '';
let _groupName: string = '';
let _summaryId: string = '';

export const groupContext = {
  get groupId() {
    return _groupId;
  },
  get groupName() {
    return _groupName;
  },
  get summaryId() {
    return _summaryId;
  },
  set(groupId: string, groupName: string) {
    _groupId = groupId;
    _groupName = groupName;
  },
  setSummaryId(summaryId: string) {
    _summaryId = summaryId;
  },
  clear() {
    _groupId = '';
    _groupName = '';
    _summaryId = '';
  },
};

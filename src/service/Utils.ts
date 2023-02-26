function capitalize(string: string | undefined): string {
  if (string === undefined) {
    return '';
  }

  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeWords(string: string | undefined): string {
  if (string === undefined) {
    return '';
  }

  return string
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

function abreviaNomePaciente(nome: string | undefined): string {
  if (nome === undefined) {
    return '';
  }

  const artigos = ['da', 'de', 'do', 'das', 'dos'];

  let nomes = nome.split(' ');
  nomes = nomes.filter(nome => !artigos.includes(nome.toLowerCase()));

  return nomes[0] + ' ' + nomes[nomes.length - 1].charAt(0) + '.';

}

function formataCpf(cpf: string | undefined): string {
  if (cpf === undefined) {
    return '';
  }

  cpf = cpf.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export { abreviaNomePaciente, capitalize, capitalizeWords, formataCpf };

const url = "https://docs.google.com/spreadsheets/d/1R6384x8by46nUVnpYwGIomjmt5zPIG1dDPJCE-4RERw/export?format=csv";

fetch(url)
  .then(res => res.text())
  .then(csv => {

    if (csv.includes("<html")) {
      alert("Erro no link da planilha");
      return;
    }

    const linhas = csv.trim().split("\n");

    const headers = linhas[0].split(",");

    const dados = linhas.slice(1).map(l => l.split(","));

    montarTabela(headers, dados);
    montarGrafico(dados);
    calcularIndicadores(dados);

  });

function montarTabela(headers, dados) {
  const tabela = document.getElementById("tabela");

  let html = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "<th>Status</th></tr>";

  dados.forEach(l => {
    const validade = tratarData(l[9]);

    let status = calcularStatus(validade);

    html += "<tr>";
    l.forEach(c => html += `<td>${c}</td>`);
    html += `<td class="status-${status}">${status}</td></tr>`;
  });

  tabela.innerHTML = html;
}

function tratarData(txt) {
  if (!txt) return null;

  const partes = txt.split("/");
  return new Date(partes[2], partes[0]-1, partes[1]);
}

function calcularStatus(data) {
  if (!data) return "vencido";

  const hoje = new Date();
  const diff = (data - hoje)/(1000*60*60*24);

  if (diff <= 0) return "vencido";
  if (diff <= 30) return "vencendo";

  return "ativo";
}

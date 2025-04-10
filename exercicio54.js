class Banco {
    constructor(titular, tipoContaTitular, senha) {
        this.titular = titular;
        this._tipoContaTitular = tipoContaTitular;
        this[saldoInicial] = 250;
        this.tiposContas = ["corrente", "poupança"];
        this._numeroConta = 0;
        this._cadastroFinalizadoAutorizado = false;
        this.senha = senha;
    }

    set tipoContaTitular (contaTitular) {

        contaTitular = contaTitular.toLowerCase();

        if (this.tiposContas.includes(contaTitular)) {
            console.warn("Tipo de conta (sucess)")
            this._tipoContaTitular = contaTitular;
            this._cadastroFinalizadoAutorizado = true;
            return;
        }

        console.error("Tipo de conta (error)");

    } 

    cadastrarTitular() {

        if (this._cadastroFinalizadoAutorizado) {

            let numerosContas = [];
            this._numeroConta += 1 * Math.floor(Math.random() * 100);

            if (!numerosContas.includes(this._numeroConta)) {
                numerosContas.push(this._numeroConta);
                const cadaster = {
                    nome: this.titular,
                    tipoConta: this._tipoContaTitular,
                    saldo: this[saldoInicial],
                    registroConta: this._numeroConta,
                    senha: this.senha,
                    extrato: []
                }
                bancoContas.contas.push(cadaster);
            }
        }
    }
}

class Titular extends Banco{
    constructor(titular, senha, depositar, sacar, transferir, consultarSaldo) {
        super(titular, null, senha);
        this._depositar = depositar;
        this._sacar = sacar;
        this._transferir = transferir;
        this.consultarSaldo = consultarSaldo;
        this.loginBanco = false;
    }

    acessarBanco(nome, senha) {

        for (let r of bancoContas.contas) {

            if (nome === r.nome && senha === r.senha) {
                console.warn("Acesso autorizado!");
                this.titular = nome;
                this.senha = senha;
                this.loginBanco = true;
            }
        }

        if (!this.loginBanco) {
            console.error("Conta não encontrada em nosso sistema. Acesso negado!");
        }

    }

    depositar(valorDeposito) {

        if (this.loginBanco && typeof valorDeposito === "number") {

            this._depositar = valorDeposito;

            for (let i = 0; i < bancoContas.contas.length; i++) {

                if (bancoContas.contas[i].nome === this.titular && this._depositar > 0) {

                    bancoContas.contas[i].saldo += this._depositar;
                    console.log("Depósito realizado com sucesso");

                    let messageSucessDeposito = `Foi realizado um depósito de R$ ${this._depositar.toFixed(2)}.`;

                    bancoContas.contas[i].extrato.push(messageSucessDeposito);

                    break;
                } 
            }
        } else {
            console.error("Não foi possível realizar o saque. Digite números para isso! Ah, verifique se está está logado.")
        }
    }

    sacar(valorSaque) {

        if (this.loginBanco && typeof valorSaque === "number") {

            this._sacar = valorSaque;

            for (let i = 0; i < bancoContas.contas.length; i++) {

                if (bancoContas.contas[i].nome === this.titular) {
                    
                    if (this._sacar > bancoContas.contas[i].saldo) {
                        console.error(`Saldo insuficente, ${this.titular}!`);
                        break;
                    } else {
                        bancoContas.contas[i].saldo -= this._sacar;
                        console.warn(`Saque realizado no valor de R$ ${valorSaque.toFixed(2)}!`);

                        let messageSucessSaque = `Foi realizado um saque de R$ ${this._sacar.toFixed(2)}.`;

                        bancoContas.contas[i].extrato.push(messageSucessSaque);
                        break;
                    }
                }
            }
        } else {
            console.error("Não foi possível realizar o saque. Digite números para isso! Ah, verifique se está está logado.")
        }
    }

    tranferir(valorTransferencia, nomeConta) {

        if (this.loginBanco && typeof valorTransferencia === "number") {

            this._transferir = valorTransferencia;

            for (let i = 0; i < bancoContas.contas.length; i++) {
                if (bancoContas.contas[i].nome === this.titular) {

                    if (bancoContas.contas[i].nome === nomeConta) {
                        console.error(`Não é possível transferir para si mesmo!`);
                        break;
                    } else {

                        for (let j = 0; j < bancoContas.contas.length; j++) {

                            if (bancoContas.contas[j].nome === nomeConta) {

                                if (bancoContas.contas[i].saldo >= this._transferir) {

                                    bancoContas.contas[i].saldo -= this._transferir;
                                    bancoContas.contas[j].saldo += this._transferir;

                                    bancoContas.contas[i].extrato.push(`Você enviou uma transferência de R$ ${this._transferir} para a conta ${bancoContas.contas[j].nome}!`);

                                    bancoContas.contas[j].extrato.push(`Você recebeu uma transferência de R$ ${this._transferir} da conta ${bancoContas.contas[i].nome}!`);
                                    break;
                
                                } else {
                                    console.error("Saldo insuficiente");
                                    break;
                                }
                            } else {
                                console.error(`Conta não encontrada!`)
                                continue;
                            }
                        }
                    }

                }
            }

        } else {
            console.error("Não foi possível realizar o saque. Digite números para isso! Ah, verifique se está está logado.")
        }

    } 

}

const bancoContas = {
    contas: []
}

const tiposContas = Symbol(); //Somente dois tipos: corrente ou poupança
const saldoInicial = Symbol(); //Saldo inicial para qualquer pessoa ao cadastrar

const Paaa = new Banco("Pedro", null, "pedro123");
Paaa.tipoContaTitular = "Corrente"
Paaa.cadastrarTitular();

const pa = new Banco("Las", null, "ldsa");
pa.tipoContaTitular = "poupança"
pa.cadastrarTitular();

const acessar = new Titular();
acessar.acessarBanco("Las", "ldsa");

acessar.depositar(100);
acessar.sacar(50);
acessar.tranferir(250, "Pedro")

console.log(bancoContas)

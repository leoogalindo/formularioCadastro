class ValidaCPF {
    constructor (cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }
    valida () {
        if(!this.cpfLimpo) {
            return false
        }
        if(typeof this.cpfLimpo !== 'string') {
            return false
        }
        if(this.cpfLimpo.length !== 11) {
            return false
        }
        if(this.sequencia()){
            return false
        }
        this.geraNovoCPF()

        return this.novoCPF === this.cpfLimpo
    }

    sequencia () {
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    }

    geraNovoCPF() {
        const cpfSemDigito = this.cpfLimpo.slice(0, -2)
        const digito1 = ValidaCPF.geraDigito(cpfSemDigito)
        const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1)
        this.novoCPF = cpfSemDigito + digito1 + digito2
    }

    static geraDigito (cpfSemDigitos) {
        let total = 0
        let reverso = cpfSemDigitos.length + 1

        for(let stringNumerica of cpfSemDigitos){
            total += reverso * Number(stringNumerica)
            reverso--
        }

        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito) : '0'
    }
}

const validacpf = new ValidaCPF('070.987.720-03')
/*
if(validacpf.valida()){
    console.log('CPF válido')
} else {
    console.log('CPF inválido')
}
*/

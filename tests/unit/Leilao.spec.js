import { mount } from '@vue/test-utils';
import Leilao from '@/components/Leilao'

const leilao = {
    produto: 'Um livro da casa do codigo',
    lanceInicial: 49,
    descricao: 'Um maravilhoso livro sobre VUE'
}

describe('Um leilão exibe os dados do produto', () => {
    test('exibe os dados do leilão no card ', () => {
        const wrapper = mount(Leilao, {
            propsData: {
                leilao
            }
        });
        const header = wrapper.find('.card-header').element ;
        const title = wrapper.find('.card-title').element ;
        const text = wrapper.find('.card-text').element ;

        // retorna todo text do component
        console.log(wrapper.text());

        expect(header.textContent).toContain('Estamos leiloando um(a): ' + leilao.produto);
        expect(title.textContent).toContain('Lance inicial: R$ ' + leilao.lanceInicial);
        expect(text.textContent).toContain(leilao.descricao);
    }); 
});
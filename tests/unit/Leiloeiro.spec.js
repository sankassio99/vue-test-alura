import { mount } from '@vue/test-utils';
import Leiloeiro from '@/views/Leiloeiro'
import { getLeilao, getLances } from '@/http' ;
import flushPromises from 'flush-promises';

const leilao = {
    produto: "Livro Teste",
    lanceInicial: 50,
    descricao: 'Livro de Vue js'
}

const lances = [
    {
        id: 1,
        valor: 1222,
        data: '2020-06-13T18:04:26,.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 200,
        data: '2020-06-13T18:04:26,.826Z',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 500,
        data: '2020-06-13T18:04:26,.826Z',
        leilao_id: 1
    },
    
]

jest.mock('@/http');

describe('Testando alerta',  () => {
    test('avisa quando não existem lances', async () => {

        // simular uma requisição http de leilão 
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce([])
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id:1
            }
        });

        // aguarda as promisses http, o método deve ser async
        await flushPromises();

        const alerta = wrapper.find('.alert-dark');

        expect(alerta.exists()).toBeTruthy();
    });
    test('Não avisa quando existem lances', async () => {

        // simular um leilão 
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id:1
            }
        });

        // aguarda as promisses http, o método deve ser async
        await flushPromises();

        const alerta = wrapper.find('.alert-dark');

        expect(alerta.exists()).toBeFalsy();
    });
});

describe('Comunica os valores de menor e maior lance', () => {
    
    test('Mostra o MAIOR lance daquele leilão', async () => {

        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id:1
            }
        });

        // aguarda as promisses http, o método deve ser async
        await flushPromises();

        const maiorLance = wrapper.find('div.maior-lance');

        expect(maiorLance.element.textContent).toBe("Maior lance: R$ "+ lances[0].valor);
    });

    test('Mostra o MENOR lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id:1
            }
        });

        // aguarda as promisses http, o método deve ser async
        await flushPromises();

        const menorLance = wrapper.find('div.menor-lance');

        expect(menorLance.element.textContent).toBe("Menor lance: R$ "+ lances[1].valor);
    });
});
import { mount, RouterLinkStub } from '@vue/test-utils';
import Avaliador from '@/views/Avaliador'
import { getLeiloes } from '@/http' ;
import flushPromises from 'flush-promises';

jest.mock("@/http");

const leiloes = [
    {
        produto: "Livro Facebook",
        lanceInicial: 50,
        descricao: 'Livro de React js'
    },
    {
        produto: "Livro Open Source",
        lanceInicial: 50,
        descricao: 'Livro de Vue js'
    }
]

describe('Um avaliador que se conecta com a API', () => {
    test('mostra todos os leilões retornados pela API', async () => {
        
        getLeiloes.mockResolvedValueOnce(leiloes);
        const wrapper = mount(Avaliador, {
            // simula o component router-link do $Router : stubs servem para dublar dependências
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        await flushPromises();

        const totalLeiloesExibidos =  wrapper.findAll(".leilao").length ;

        expect(totalLeiloesExibidos).toBe(leiloes.length)

    });

    test('não há erros retornado pela API', async () => {
        getLeiloes.mockResolvedValueOnce();
        const wrapper = mount(Avaliador, {
            // simula o component router-link do $Router : stubs servem para dublar dependências
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        await flushPromises();

        const totalLeiloesExibidos =  wrapper.findAll(".leilao").length ;

        expect(totalLeiloesExibidos).toBe(0)
    });
});
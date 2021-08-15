import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe("Um lance sem valor minimo", () => {
    test('não aceita lance com valor menor do que 0', () => {
        const wrapper = mount(Lance);
        const input = wrapper.find('input');
        input.setValue(-100);
        const lancesEmitidos = wrapper.emitted('novo-lance');
        expect(lancesEmitidos).toBeUndefined();
    })
    
    test("emite um lance quando o valor é maior que zero", () => {
        const wrapper = mount(Lance);
        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        expect(lancesEmitidos).toHaveLength(1);
    })
    
    test("emite valor esperado de um lance válido", () => {
        const wrapper = mount(Lance);
        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        const lance = parseInt(lancesEmitidos[0][0]);
        expect(lance).toBe(100);
    })
})

describe('um lance com valor minimo', () => {
    test('todos os lances devem possuir um valor maior que o minimo informado', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        expect(lancesEmitidos).toHaveLength(1);
    })

    test('valor esperado de um lance valido', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        const valorLance = parseInt(lancesEmitidos[0][0]);
        expect(valorLance).toBe(400);
    })

    test('não são aceitos lances com valores menores que o minimo informado', async() => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(299);
        wrapper.trigger('submit');
        // aguarda a proxima atualização do DOM, o método precisar ser Async
        await wrapper.vm.$nextTick();
        const msgErro = wrapper.find('p.alert').element ;
        expect(msgErro).toBeTruthy();
    })

    test('deve exibir aleta caso o valor seja menor que o valor minimo indicado', async() => {
        const lanceMinimo = 300 ;
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: lanceMinimo 
            }
        });
        const input = wrapper.find('input');
        input.setValue(299);
        wrapper.trigger('submit');
        
        // aguarda a proxima atualização do DOM, o método precisar ser Async
        await wrapper.vm.$nextTick();

        // capturando o value exibido na tag 'p' com classe 'alert'
        const msgErro = wrapper.find('p.alert').element.textContent ;
        const msgEsperada = 'O valor mínimo para o lance é de R$ '+lanceMinimo
        expect(msgErro).toContain(msgEsperada);
    })
})
import { mount } from '@vue/test-utils';
import NovoLeilao from '@/views/NovoLeilao'
import { createLeilao } from '@/http' ;

jest.mock("@/http");

const $router = {
    push: jest.fn()
}

describe('Um novo leilao deve ser criado', () => {
    test('Dados o formulário preenchido, um leilao deve ser criado', () => {
        createLeilao.mockResolvedValueOnce();

        const wrapper = mount(NovoLeilao, 
            {
                mocks: {
                    $router
                }
            });

        wrapper.find('.produto').setValue('Um Livro da casa do código');
        wrapper.find('.descricao').setValue('Do balacubaco');
        wrapper.find('.valor').setValue(100);

        wrapper.find('form').trigger('submit');

        expect(createLeilao).toHaveBeenCalled()
        
    });
});
import { z } from 'zod';

const data = z.object({
    username: z.string()
        .min(3, { message: 'O nome de usuário necessita ter no mínimo 3 caracteres' }),
    password: z.string()
        .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
            { message: 'A senha precisa ter no mínimo 8 caracteres com pelo menos uma letra maiúscula e um número' })
});

const requiredData = data.required();

export default requiredData;
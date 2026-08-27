import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  companyName: z.string().optional(),
  zipCode: z
    .string()
    .min(8, "CEP inválido")
    .max(9, "CEP inválido"),
  countryRegion: z.string().min(1, "País/Região é obrigatório"),
  streetAddress: z.string().min(1, "Endereço é obrigatório"),
  townCity: z.string().min(1, "Cidade é obrigatória"),
  province: z.string().min(1, "Estado é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(["bank_transfer", "cash"], {
    errorMap: () => ({ message: "Selecione um método de pagamento" }),
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
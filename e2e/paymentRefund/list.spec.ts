import MercadoPago, { Payment, PaymentRefund } from '@src/index';
import fetch from 'node-fetch';
import { config } from '../e2e.config';
import type { PaymentRefundCreateData } from '@src/clients/paymentRefund/create/types';
import type { PaymentRefundListData } from '@src/clients/paymentRefund/list/types';

describe('IT refunds, list', () => {
	test('should make a request, return a list and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const refund = new PaymentRefund(client);
		const payment = new Payment(client);
		try {
			const cardToken = await createCardToken();
			expect(cardToken).toHaveProperty('id');

			const paymentBody = {
				body: {
					additional_info: {
						items: [
							{
								id: 'MLB2907679857',
								title: 'Point Mini',
								quantity: 1,
								unit_price: 58.8
							}
						]
					},
					payer: {
						email: 'test_user_123@testuser.com',
					},
					transaction_amount: 110.00,
					installments: 1,
					token: cardToken.id,
					payment_method_id: 'master',
				}
			};

			const createdPayment = await payment.create(paymentBody);
			expect(createdPayment).toHaveProperty('id');

			const requestRefund: PaymentRefundCreateData = {
				payment_id: createdPayment.id,
				body: {
					amount: 5
				},
			};
			const refunded = await refund.create(requestRefund);
			expect(refunded).toHaveProperty('id');

			const requestList: PaymentRefundListData = {
				payment_id: refunded.payment_id,
			};

			const refundList = await refund.list(requestList);
			expect(refundList[0]).toHaveProperty('payment_id', requestList.payment_id);
			expect(Array.isArray(refundList)).toBe(true);
			expect(refundList[0]).toEqual(expect.objectContaining({
				id: expect.any(Number),
				payment_id: expect.any(Number),
				date_created: expect.any(String),
				amount: expect.any(Number),
				source: expect.objectContaining({
					id: expect.any(String),
					name: expect.any(String),
					type: expect.any(String),
				}),
				refund_mode: expect.any(String),
				adjustment_amount: expect.any(Number),
				status: expect.any(String),
				amount_refunded_to_payer: expect.any(Number),
			})
			);
		} catch(e) {
			console.error(e);
		}
	}, 10000);

	async function createCardToken() {
		const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + config.access_token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				card_number: '5031433215406351',
				expiration_year: '2025',
				expiration_month: '11',
				security_code: '123',
				cardholder: {
					identification: {
						type: 'CPF',
						number: '01234567890'
					},
					name: 'APRO'
				}
			})
		});
		return await response.json();
	}
});

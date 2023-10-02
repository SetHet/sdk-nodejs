import get from './get';
import create from './create';
import remove from './remove';
import update from './update';
import list from './list';

import type { CustomerCardsCreateData } from './create/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerCardsUpdateData } from './update/types';
import type { CustomerCardsListData } from './list/types';
import type { CustomerCardResponse, CustomerCardsGetRemoveData } from './commonTypes';

/**
 * Mercado Pago Customer card.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post Documentation }.
 */
export class CustomerCard {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Mercado Pago Customer card create.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
	 */
	create ({ customerId, body, requestOptions }: CustomerCardsCreateData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ customerId: customerId, body, config: this.config });
	}

	/**
	 * Mercado Pago customer card get.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
	*/
	get({ customerId, cardId, requestOptions }: CustomerCardsGetRemoveData): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ customerId: customerId, cardId: cardId, config: this.config });
	}

	/**
	 * Mercado Pago customer card remove.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
	 */
	remove({ customerId, cardId, requestOptions }: CustomerCardsGetRemoveData ): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return remove({ customerId: customerId, cardId: cardId, config: this.config });
	}

	/**
	 * Mercado Pago customer card update.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
	 */
	update({ customerId, cardId, body, requestOptions }: CustomerCardsUpdateData ): Promise<CustomerCardResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ customerId: customerId, cardId: cardId, body , config: this.config });
	}

	/**
	 * Mercado Pago customer card list.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/list.ts Usage Example  }.
	 */
	list({ customerId, requestOptions }: CustomerCardsListData ): Promise<CustomerCardResponse[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ customerId: customerId, config: this.config });
	}
}

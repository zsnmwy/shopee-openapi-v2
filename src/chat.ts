/*
 * @Author: Monve
 * @Date: 2022-06-02 10:28:39
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-15 17:30:17
 * @FilePath: /shopee-openapi-v2/src/chat.ts
 */

import { ApiShopMethod, BaseRes, Get, Post, ShopReq } from "./utils/request"
import * as FormData from 'form-data'

export type Conversation = {
  conversation_id: string,
  to_id: number,
  to_name: string,
  to_avatar: string,
  shop_id: number,
  unread_count: number,
  pinned: boolean,
  last_read_message_id: string,
  latest_message_id: string,
  latest_message_type: string,
  latest_message_content: {
    text: string
  },
  latest_message_from_id: number,
  last_message_timestamp: number,
  last_message_option: number,
  max_general_option_hide_time: string
}

export class ChatApi {

  @Get({ url: '/api/v2/sellerchat/get_message' })
  getMessage!: ApiShopMethod<
    { offset?: string; page_size?: number, conversation_id: number },
    {
      response: {
        messages: {
          message_id: string, message_type: string, from_id: number,
          from_shop_id: number, to_id: number, to_shop_id: number,
          conversation_id: string, created_timestamp: number,
          region: string, status: string, source: string,
          content: { text: string }, message_option: number,
          source_content: {
            order_sn: string,
            item_id: number
          }
        }[],
        page_result: { next_offset: string, page_size: number }
      }
    }
  >

  @Post({ url: '/api/v2/sellerchat/send_message' })
  sendMessage!: ApiShopMethod<
    {
      to_id: number, message_type: 'text' | 'sticker' | 'image' | 'item' | 'order',
      content: {
        text?: string,
        stick_id?: string,
        sticker_package_id?: string,
        image_url?: string,
        item_id?: number,
        order_sn?: string
      }
    },
    {
      response: {
        content: {
          text: string
        }
        region: string,
        to_id: number,
        created_timestamp: number,
        conversation_id: string,
        message_type: string,
        message_id: string,
        message_option: number
      }
    }
  >

  @Get({ url: '/api/v2/sellerchat/get_conversation_list' })
  getConversationList!: ApiShopMethod<
    {
      direction: 'latest' | 'older', type: 'all' | 'pinned' | 'unread',
      next_timestamp_nano?: number, page_size?: number
    },
    {
      response: {
        page_result: {
          page_size: number,
          next_cursor: {
            next_message_time_nano: string,
            conversation_id: string
          },
          more: boolean
        },
        conversations: Conversation[]
      }
    }
  >

  @Get({ url: '/api/v2/sellerchat/get_one_conversation' })
  getOneConversation!: ApiShopMethod<
    { conversation_id: number },
    { response: Conversation }
  >

  @Post({ url: '/api/v2/sellerchat/delete_conversation' })
  deleteConversation!: ApiShopMethod<
    { conversation_id: number },
    { response: {} }
  >

  @Get({ url: '/api/v2/sellerchat/get_unread_conversation_count' })
  getUnreadConversationCount!: ApiShopMethod<
    {},
    { response: { total_unread_count: number } }
  >


  @Post({ url: '/api/v2/sellerchat/pin_conversation' })
  pinConversation!: ApiShopMethod<
    { conversation_id: number },
    { response: {} }
  >

  @Post({ url: '/api/v2/sellerchat/unpin_conversation' })
  unpinConversation!: ApiShopMethod<
    { conversation_id: number },
    { response: {} }
  >

  @Post({ url: '/api/v2/sellerchat/read_conversation' })
  readConversation!: ApiShopMethod<
    { conversation_id: number, last_read_message_id: string },
    { response: {} }
  >

  @Post({ url: '/api/v2/sellerchat/unread_conversation' })
  unreadConversation!: ApiShopMethod<
    { conversation_id: number },
    { response: {} }
  >

  @Get({ url: '/api/v2/sellerchat/get_offer_toggle_status' })
  getOfferToggleStatus!: ApiShopMethod<
    {},
    {
      response: {
        shop_id: number,
        make_offer_status: 'disabled' | 'enabled'
      }
    }
  >

  @Post({ url: '/api/v2/sellerchat/set_offer_toggle_status' })
  setOfferToggleStatus!: ApiShopMethod<
    { make_offer_status: 'disabled' | 'enabled' },
    { response: {} }
  >

  /**
   * can only support "jpg","jpeg","png","gif". The max size of the file is 2MB
   */
  uploadImage: (data: { file: FormData } & ShopReq) => Promise<{
    response: {
      url: string, thumbnail: string, file_server_id?: number,
      thumb_height?: number, thumb_width?: number, url_hash?: string
    }
  } & BaseRes>;

  @Post({ url: '/api/v2/sellerchat/send_autoreply_message' })
  sendAutoreplyMessage!: ApiShopMethod<
    {
      to_id: number,
      content: {
        text: string
      }
    },
    {
      response: {
        message_id: string,
        to_id: number,
        message_type: string,
        content: {
          text: string
        },
        conversation_id: number,
        created_timestamp: number,
        message_option: number,
        source_content: {}
      }
    }
  >

}
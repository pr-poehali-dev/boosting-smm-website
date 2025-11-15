"""
Business: Retrieves list of all orders with filtering by status
Args: event with httpMethod, queryStringParameters (optional status filter)
Returns: HTTP response with array of orders
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    status_filter = params.get('status', '')
    
    dsn = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if status_filter:
        cur.execute(
            "SELECT id, service_type, link, quantity, status, created_at FROM t_p27177844_boosting_smm_website.orders WHERE status = %s ORDER BY created_at DESC LIMIT 100",
            (status_filter,)
        )
    else:
        cur.execute(
            "SELECT id, service_type, link, quantity, status, created_at FROM t_p27177844_boosting_smm_website.orders ORDER BY created_at DESC LIMIT 100"
        )
    
    orders = cur.fetchall()
    
    cur.close()
    conn.close()
    
    orders_list = []
    for order in orders:
        orders_list.append({
            'id': order['id'],
            'service_type': order['service_type'],
            'link': order['link'],
            'quantity': order['quantity'],
            'status': order['status'],
            'created_at': order['created_at'].isoformat()
        })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'orders': orders_list,
            'total': len(orders_list)
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }

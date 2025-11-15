"""
Business: Accepts and processes SMM boost orders (posts, stars)
Args: event with httpMethod, body containing service_type, link, quantity
Returns: HTTP response with order details and status
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
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    service_type = body_data.get('service_type', '')
    link = body_data.get('link', '')
    quantity = body_data.get('quantity', 0)
    
    if not all([service_type, link, quantity]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        "INSERT INTO t_p27177844_boosting_smm_website.orders (service_type, link, quantity, status) VALUES (%s, %s, %s, 'processing') RETURNING id, service_type, link, quantity, status, created_at",
        (service_type, link, int(quantity))
    )
    
    order = cur.fetchone()
    conn.commit()
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'order': {
                'id': order['id'],
                'service_type': order['service_type'],
                'link': order['link'],
                'quantity': order['quantity'],
                'status': order['status'],
                'created_at': order['created_at'].isoformat()
            }
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }

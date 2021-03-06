#!/usr/bin/env python
import web
import json

urls = (
    '/checkIngredients', 'checkIngredients',
    '/markOut/(.*)', 'markOut',
    '/markIn/(.*)', 'markIn'
)


jsonString = '''[
  {
    "type": "liquor",
    "id" : "brandy",
    "name": "Brandy",
    "inStock": true
  },

  {
    "type": "liquor",
    "id" : "bourbon",
    "name": "Bourbon",
    "inStock": true
  },

  {
    "type": "liquor",
    "id" : "dark-rum",
    "name": "Dark Rum",
    "inStock": false
  },

  {
    "type": "liquor",
    "id" : "gin",
    "name": "Gin",
    "inStock": false
  },

  {
    "type": "liquor",
    "id" : "light-rum",
    "name": "Light Rum",
    "inStock": false
  },

  {
    "type": "liquor",
    "id" : "tequila",
    "name": "Tequila",
    "inStock": true
  },

  {
    "type": "liquor",
    "id" : "vodka",
    "name": "Vodka",
    "inStock": true
  },

  {
    "type": "liquor",
    "id" : "whiskey",
    "name": "Whiskey",
    "inStock": true
  },










  {
    "type": "mixer",
    "id" : "amaretto",
    "name": "Amaretto",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "bitters",
    "name": "Bitters",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "blue",
    "name": "Blue Curacao",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "champagne",
    "name": "Champagne",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "club-soda",
    "name": "Club Soda",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "creme-de-cacao",
    "name": "Creme de Cacao",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "creme-de-menth",
    "name": "Creme de Menthe",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "dry-vermouth",
    "name": "Dry Vermouth",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "grenadine",
    "name": "Grenadine",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "ginger-ale",
    "name": "Ginger Ale",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "ginger-beer",
    "name": "Ginger Beer",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "irish-cream",
    "name": "Irish Cream",
    "inStock": true
  },


  {
    "type": "mixer",
    "id" : "apple-juice",
    "name": "Juice - Apple",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "cranberry-juice",
    "name": "Juice - Cranberry",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "grapefruit-juice",
    "name": "Juice - Grapefruit",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "lemon-juice",
    "name": "Juice - Lemon",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "lime-juice",
    "name": "Juice - Lime",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "mango-juice",
    "name": "Juice - Mango",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "orange-juice",
    "name": "Juice - Orange",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "peach-juice",
    "name": "Juice - Peach",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "pineapple-juice",
    "name": "Juice - Pineapple",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "kahlua",
    "name": "Kahlua",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "melon-liqueur",
    "name": "Melon Liqueur",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "orange-schnapps",
    "name": "Orange Schnapps",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "peach-schnapps",
    "name": "Peach Schnapps",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "simple-syrup",
    "name": "Simple Syrup",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "cola",
    "name": "Soda - Cola",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "sprite",
    "name": "Soda - Sprite",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "sour-mix",
    "name": "Sour Mix",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "so-co",
    "name": "Southern Comfort",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "sweet-lime",
    "name": "Sweet Lime",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "sweet-sour-mix",
    "name": "Sweet & Sour Mix",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "sweet-vermouth",
    "name": "Sweet Vermouth",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "triple-sec",
    "name": "Triple Sec",
    "inStock": true
  },

  {
    "type": "mixer",
    "id" : "wine",
    "name": "Wine",
    "inStock": true
  },











  {
    "type": "other",
    "id" : "cinnamon",
    "name": "Cinnamon",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "cream",
    "name": "Cream",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "lime",
    "name": "Lime",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "lemon",
    "name": "Lemon",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "cherry",
    "name": "Maraschino Cherry",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "milk",
    "name": "Milk",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "mint",
    "name": "Mint",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "strawberry",
    "name": "Strawberry",
    "inStock": true
  },

  {
    "type": "other",
    "id" : "sugar",
    "name": "Sugar",
    "inStock": true
  }

]'''

ingredients = json.loads(jsonString)

class checkIngredients:        
    def GET(self):
        web.header('Access-Control-Allow-Origin',      '*')
	web.header('Access-Control-Allow-Credentials', 'true')
        return json.dumps(ingredients)

class markOut:
    def GET(self, drink):
        web.header('Access-Control-Allow-Origin',      '*')
	web.header('Access-Control-Allow-Credentials', 'true')
        for ing in ingredients:
            if drink == ing['id']:
                ing['inStock'] = False
                return 'Marked ' + str(drink) + ' as out of stock'
        return 'Couldn\'t find ' + str(drink)

class markIn:
    def GET(self, drink):
        web.header('Access-Control-Allow-Origin',      '*')
	web.header('Access-Control-Allow-Credentials', 'true')
        for ing in ingredients:
            if drink == ing['id']:
                ing['inStock'] = True
                return 'Marked ' + str(drink) + ' as in stock'
        return 'Couldn\'t find ' + str(drink)

class MyApplication(web.application):
    def run(self, port=8080, *middleware):
        func = self.wsgifunc(*middleware)
        return web.httpserver.runsimple(func, ('0.0.0.0', port))

if __name__ == "__main__":
    app = MyApplication(urls, globals())
    app.run(port=8888)

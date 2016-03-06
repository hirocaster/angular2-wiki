# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Item.create(title: "Hello", body: "# World", rendered_body: "<h1>World</h1>") unless Item.exists?(id: 1)
Item.create(title: "Hello2", body: "# World2", rendered_body: "<h1>World2</h1>") unless Item.exists?(id: 2)

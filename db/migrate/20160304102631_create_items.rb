class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :body
      t.string :rendered_body
      t.string :title

      t.timestamps null: false
    end
  end
end

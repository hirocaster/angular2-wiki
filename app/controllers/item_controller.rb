class ItemController < ApplicationController
  def index
    render json: Item.all
  end

  def view
    item = Item.find(params[:id])
    render json: item
  end
end

class ItemController < ApplicationController
  def index
    render json: Item.all
  end

  def view
    item = Item.find(params[:id])
    render json: item
  end

  def update
    item = Item.find(params[:item][:id])
    item.update(item_params)
    render json: item
  end

  def item_params
    params.require(:item).permit(:title, :body)
  end
end

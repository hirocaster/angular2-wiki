class ItemController < ApplicationController
  def index
    render json: Item.all
  end

  def new
    render json: Item.new
  end

  def create
    item = Item.new
    item.attributes = item_params
    item.markup
    item.save
    render json: item
  end

  def view
    item = Item.find(params[:id])
    render json: item
  end

  def update
    item = Item.find(params[:item][:id])
    item.attributes = item_params
    item.markup
    item.save
    render json: item
  end

  def preview
    item = Item.new
    item.attributes = item_params
    item.markup
    render json: item
  end

  def item_params
    params.require(:item).permit(:title, :body)
  end
end

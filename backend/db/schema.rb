# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_28_165818) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "appointments", force: :cascade do |t|
    t.bigint "baby_id"
    t.datetime "appointment_date"
    t.string "doctor_name"
    t.string "location"
    t.text "appointment_information"
    t.boolean "past_appointment"
    t.index ["baby_id"], name: "index_appointments_on_baby_id"
  end

  create_table "babies", force: :cascade do |t|
    t.date "due_date"
    t.string "mother"
    t.string "father"
    t.integer "days_until_due"
  end

  create_table "checklists", force: :cascade do |t|
  end

  create_table "names", force: :cascade do |t|
    t.bigint "baby_id"
    t.string "name"
    t.text "meaning"
    t.string "usage"
    t.string "definition"
    t.index ["baby_id"], name: "index_names_on_baby_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end

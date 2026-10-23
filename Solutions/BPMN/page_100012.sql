prompt --application/set_environment
set define off verify off feedback off
whenever sqlerror exit sql.sqlcode rollback
--------------------------------------------------------------------------------
--
-- Oracle APEX export file
--
-- You should run this script using a SQL client connected to the database as
-- the owner (parsing schema) of the application or as a database user with the
-- APEX_ADMINISTRATOR_ROLE role.
--
-- This export file has been automatically generated. Modifying this file is not
-- supported by Oracle and can lead to unexpected application and/or instance
-- behavior now or in the future.
--
-- NOTE: Calls to apex_application_install override the defaults below.
--
--------------------------------------------------------------------------------
begin
wwv_flow_imp.import_begin (
 p_version_yyyy_mm_dd=>'2024.05.31'
,p_release=>'24.1.0'
,p_default_workspace_id=>5488726071905790
,p_default_application_id=>155
,p_default_id_offset=>7279894269616867
,p_default_owner=>'HRA'
);
end;
/
 
prompt APPLICATION 155 - مدیریت مستندات پروژه
--
-- Application Export:
--   Application:     155
--   Name:            مدیریت مستندات پروژه
--   Exported By:     902408
--   Flashback:       0
--   Export Type:     Page Export
--   Manifest
--     PAGE: 100012
--   Manifest End
--   Version:         24.1.0
--   Instance ID:     716601610357875
--

begin
null;
end;
/
prompt --application/pages/delete_100012
begin
wwv_flow_imp_page.remove_page (p_flow_id=>wwv_flow.g_flow_id, p_page_id=>100012);
end;
/
prompt --application/pages/page_100012
begin
wwv_flow_imp_page.create_page(
 p_id=>100012
,p_name=>'bpmn io'
,p_alias=>'BPMN-IO'
,p_step_title=>'bpmn io'
,p_autocomplete_on_off=>'OFF'
,p_javascript_file_urls=>wwv_flow_string.join(wwv_flow_t_varchar2(
'-- https://unpkg.com/bpmn-js@18.6.3/dist/bpmn-modeler.development.js',
'-- https://cdn.jsdelivr.net/npm/bpmn-js@18.6.3/dist/bpmn-modeler.development.js',
'#APP_FILES#bpmn/bpmn-modeler.development.js',
'#APP_FILES#bpmn/my-bpmn.js'))
,p_javascript_code=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'',
''))
,p_javascript_code_onload=>wwv_flow_string.join(wwv_flow_t_varchar2(
'bpmn.init(''bpmnContainer'')',
unistr('// \0628\0631\0627\06CC \0627\06CC\0646\06A9\0647 \062F\06CC\0627\06AF\0631\0627\0645 \062F\0631 \0635\0641\062D\0647 \0642\0627\0628\0644 \0627\0633\062A\0641\0627\062F\0647 \0628\0627\0634\062F'),
unistr('// \062F\0631 \0632\0645\0627\0646 \0644\0648\062F \0635\0641\062D\0647 \0628\0627\06CC\062F \0627\062C\0631\0627 \0634\0648\062F'),
'bpmn.new();'))
,p_css_file_urls=>wwv_flow_string.join(wwv_flow_t_varchar2(
'-- https://unpkg.com/bpmn-js@18.6.3/dist/assets/diagram-js.css',
'-- https://unpkg.com/bpmn-js@18.6.3/dist/assets/bpmn-font/css/bpmn-embedded.css',
'',
'-- https://cdn.jsdelivr.net/npm/bpmn-js@18.6.3/dist/assets/diagram-js.css',
'-- https://cdn.jsdelivr.net/npm/bpmn-js@18.6.3/dist/assets/bpmn-font/css/bpmn-embedded.css',
'',
'#APP_FILES#bpmn/diagram-js.css',
'#APP_FILES#bpmn/bpmn-embedded.css'))
,p_inline_css=>wwv_flow_string.join(wwv_flow_t_varchar2(
' html body {direction: ltr !important;}  ',
''))
,p_page_template_options=>'#DEFAULT#'
,p_protection_level=>'C'
,p_page_component_map=>'18'
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(29457768060073604)
,p_plug_name=>'Modeler / Rep'
,p_region_template_options=>'#DEFAULT#:t-TabsRegion-mod--simple'
,p_plug_template=>wwv_flow_imp.id(205997886390516913)
,p_plug_display_sequence=>70
,p_location=>null
,p_attributes=>wwv_flow_t_plugin_attributes(wwv_flow_t_varchar2(
  'expand_shortcuts', 'N',
  'output_as', 'HTML')).to_clob
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(29460607797073633)
,p_plug_name=>'Reports'
,p_parent_plug_id=>wwv_flow_imp.id(29457768060073604)
,p_region_template_options=>'#DEFAULT#:t-TabsRegion-mod--pill'
,p_plug_template=>wwv_flow_imp.id(205997886390516913)
,p_plug_display_sequence=>20
,p_plug_display_point=>'SUB_REGIONS'
,p_location=>null
,p_attributes=>wwv_flow_t_plugin_attributes(wwv_flow_t_varchar2(
  'expand_shortcuts', 'N',
  'output_as', 'HTML')).to_clob
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(29458208044073609)
,p_plug_name=>'Activities'
,p_parent_plug_id=>wwv_flow_imp.id(29460607797073633)
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_imp.id(205949377935516892)
,p_plug_display_sequence=>30
,p_plug_display_point=>'SUB_REGIONS'
,p_query_type=>'SQL'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select * ',
'from  PKG_BPMN.get_activities ',
'(',
'    (select "CONTENT"',
'    from my_flows',
'    where id = :P100012_LOV_DIAGRAM)',
')',
''))
,p_plug_source_type=>'NATIVE_IR'
,p_ajax_items_to_submit=>'P100012_LOV_DIAGRAM'
,p_prn_content_disposition=>'ATTACHMENT'
,p_prn_units=>'MILLIMETERS'
,p_prn_paper_size=>'A4'
,p_prn_width=>297
,p_prn_height=>210
,p_prn_orientation=>'HORIZONTAL'
,p_prn_page_header_font_color=>'#000000'
,p_prn_page_header_font_family=>'Helvetica'
,p_prn_page_header_font_weight=>'normal'
,p_prn_page_header_font_size=>'12'
,p_prn_page_footer_font_color=>'#000000'
,p_prn_page_footer_font_family=>'Helvetica'
,p_prn_page_footer_font_weight=>'normal'
,p_prn_page_footer_font_size=>'12'
,p_prn_header_bg_color=>'#EEEEEE'
,p_prn_header_font_color=>'#000000'
,p_prn_header_font_family=>'Helvetica'
,p_prn_header_font_weight=>'bold'
,p_prn_header_font_size=>'10'
,p_prn_body_bg_color=>'#FFFFFF'
,p_prn_body_font_color=>'#000000'
,p_prn_body_font_family=>'Helvetica'
,p_prn_body_font_weight=>'normal'
,p_prn_body_font_size=>'10'
,p_prn_border_width=>.5
,p_prn_page_header_alignment=>'CENTER'
,p_prn_page_footer_alignment=>'CENTER'
,p_prn_border_color=>'#666666'
);
wwv_flow_imp_page.create_worksheet(
 p_id=>wwv_flow_imp.id(29460194316073628)
,p_max_row_count=>'1000000'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_lazy_loading=>false
,p_show_detail_link=>'N'
,p_show_notify=>'Y'
,p_download_formats=>'CSV:HTML:XLSX:PDF'
,p_enable_mail_download=>'Y'
,p_owner=>'902408'
,p_internal_uid=>29460194316073628
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29460277219073629)
,p_db_column_name=>'ID'
,p_display_order=>10
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29460302720073630)
,p_db_column_name=>'NAME'
,p_display_order=>20
,p_column_identifier=>'B'
,p_column_label=>'Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29460498441073631)
,p_db_column_name=>'BPMN_NAME'
,p_display_order=>30
,p_column_identifier=>'C'
,p_column_label=>'Bpmn Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29460574085073632)
,p_db_column_name=>'XML_NAME'
,p_display_order=>40
,p_column_identifier=>'D'
,p_column_label=>'Xml Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_rpt(
 p_id=>wwv_flow_imp.id(29674684878044573)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'296747'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:NAME:BPMN_NAME:XML_NAME'
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(29458389573073610)
,p_plug_name=>'Objects'
,p_parent_plug_id=>wwv_flow_imp.id(29460607797073633)
,p_region_template_options=>'#DEFAULT#'
,p_component_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_imp.id(205949377935516892)
,p_plug_display_sequence=>20
,p_plug_display_point=>'SUB_REGIONS'
,p_query_type=>'SQL'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select * ',
'from  table',
'(pkg_bpmn.get_objects ',
'    (',
'        (select "CONTENT"',
'        from my_flows',
'        where id = :P100012_LOV_DIAGRAM)',
'    )',
')'))
,p_plug_source_type=>'NATIVE_IR'
,p_ajax_items_to_submit=>'P100012_LOV_DIAGRAM'
,p_prn_content_disposition=>'ATTACHMENT'
,p_prn_units=>'MILLIMETERS'
,p_prn_paper_size=>'A4'
,p_prn_width=>297
,p_prn_height=>210
,p_prn_orientation=>'HORIZONTAL'
,p_prn_page_header_font_color=>'#000000'
,p_prn_page_header_font_family=>'Helvetica'
,p_prn_page_header_font_weight=>'normal'
,p_prn_page_header_font_size=>'12'
,p_prn_page_footer_font_color=>'#000000'
,p_prn_page_footer_font_family=>'Helvetica'
,p_prn_page_footer_font_weight=>'normal'
,p_prn_page_footer_font_size=>'12'
,p_prn_header_bg_color=>'#EEEEEE'
,p_prn_header_font_color=>'#000000'
,p_prn_header_font_family=>'Helvetica'
,p_prn_header_font_weight=>'bold'
,p_prn_header_font_size=>'10'
,p_prn_body_bg_color=>'#FFFFFF'
,p_prn_body_font_color=>'#000000'
,p_prn_body_font_family=>'Helvetica'
,p_prn_body_font_weight=>'normal'
,p_prn_body_font_size=>'10'
,p_prn_border_width=>.5
,p_prn_page_header_alignment=>'CENTER'
,p_prn_page_footer_alignment=>'CENTER'
,p_prn_border_color=>'#666666'
);
wwv_flow_imp_page.create_worksheet(
 p_id=>wwv_flow_imp.id(29458589908073612)
,p_max_row_count=>'1000000'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_lazy_loading=>false
,p_show_detail_link=>'N'
,p_show_notify=>'Y'
,p_download_formats=>'CSV:HTML:XLSX:PDF'
,p_enable_mail_download=>'Y'
,p_owner=>'902408'
,p_internal_uid=>29458589908073612
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29458663118073613)
,p_db_column_name=>'ID'
,p_display_order=>10
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29458793728073614)
,p_db_column_name=>'NAME'
,p_display_order=>20
,p_column_identifier=>'B'
,p_column_label=>'Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29458876627073615)
,p_db_column_name=>'BPMN_NAME'
,p_display_order=>30
,p_column_identifier=>'C'
,p_column_label=>'Bpmn Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
,p_required_patch=>wwv_flow_imp.id(205889163087516852)
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29458970141073616)
,p_db_column_name=>'XML_NAME'
,p_display_order=>40
,p_column_identifier=>'D'
,p_column_label=>'Xml Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_rpt(
 p_id=>wwv_flow_imp.id(29642635081894829)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'296427'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:NAME:BPMN_NAME:XML_NAME'
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(29458402501073611)
,p_plug_name=>'Flows'
,p_parent_plug_id=>wwv_flow_imp.id(29460607797073633)
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_imp.id(205949377935516892)
,p_plug_display_sequence=>30
,p_plug_display_point=>'SUB_REGIONS'
,p_query_type=>'SQL'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select * ',
'from  PKG_BPMN.get_flows ',
'(',
'    (select "CONTENT"',
'    from my_flows',
'    where id = :P100012_LOV_DIAGRAM)',
'',
')',
''))
,p_plug_source_type=>'NATIVE_IR'
,p_ajax_items_to_submit=>'P100012_LOV_DIAGRAM'
,p_prn_content_disposition=>'ATTACHMENT'
,p_prn_units=>'MILLIMETERS'
,p_prn_paper_size=>'A4'
,p_prn_width=>297
,p_prn_height=>210
,p_prn_orientation=>'HORIZONTAL'
,p_prn_page_header_font_color=>'#000000'
,p_prn_page_header_font_family=>'Helvetica'
,p_prn_page_header_font_weight=>'normal'
,p_prn_page_header_font_size=>'12'
,p_prn_page_footer_font_color=>'#000000'
,p_prn_page_footer_font_family=>'Helvetica'
,p_prn_page_footer_font_weight=>'normal'
,p_prn_page_footer_font_size=>'12'
,p_prn_header_bg_color=>'#EEEEEE'
,p_prn_header_font_color=>'#000000'
,p_prn_header_font_family=>'Helvetica'
,p_prn_header_font_weight=>'bold'
,p_prn_header_font_size=>'10'
,p_prn_body_bg_color=>'#FFFFFF'
,p_prn_body_font_color=>'#000000'
,p_prn_body_font_family=>'Helvetica'
,p_prn_body_font_weight=>'normal'
,p_prn_body_font_size=>'10'
,p_prn_border_width=>.5
,p_prn_page_header_alignment=>'CENTER'
,p_prn_page_footer_alignment=>'CENTER'
,p_prn_border_color=>'#666666'
);
wwv_flow_imp_page.create_worksheet(
 p_id=>wwv_flow_imp.id(29459528215073622)
,p_max_row_count=>'1000000'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_lazy_loading=>false
,p_show_detail_link=>'N'
,p_show_notify=>'Y'
,p_download_formats=>'CSV:HTML:XLSX:PDF'
,p_enable_mail_download=>'Y'
,p_owner=>'902408'
,p_internal_uid=>29459528215073622
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29459605352073623)
,p_db_column_name=>'ID'
,p_display_order=>10
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29459703029073624)
,p_db_column_name=>'NAME'
,p_display_order=>20
,p_column_identifier=>'B'
,p_column_label=>'Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29459825088073625)
,p_db_column_name=>'SOURCE_ID'
,p_display_order=>30
,p_column_identifier=>'C'
,p_column_label=>'Source Id'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29459981631073626)
,p_db_column_name=>'TARGET_ID'
,p_display_order=>40
,p_column_identifier=>'D'
,p_column_label=>'Target Id'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_column(
 p_id=>wwv_flow_imp.id(29460055587073627)
,p_db_column_name=>'XML_NAME'
,p_display_order=>50
,p_column_identifier=>'E'
,p_column_label=>'Xml Name'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_use_as_row_header=>'N'
);
wwv_flow_imp_page.create_worksheet_rpt(
 p_id=>wwv_flow_imp.id(29655140634929935)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'296552'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:NAME:SOURCE_ID:TARGET_ID:XML_NAME'
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(695328655248967798)
,p_plug_name=>'Modeler'
,p_parent_plug_id=>wwv_flow_imp.id(29457768060073604)
,p_region_template_options=>'#DEFAULT#:t-Region--scrollBody'
,p_plug_template=>wwv_flow_imp.id(206001819399516915)
,p_plug_display_sequence=>10
,p_plug_display_point=>'SUB_REGIONS'
,p_location=>null
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div id="bpmnContainer"  style="width:100%; height:600px; border:1px solid #ccc;"></div>',
'    '))
,p_ai_enabled=>false
,p_attributes=>wwv_flow_t_plugin_attributes(wwv_flow_t_varchar2(
  'expand_shortcuts', 'N',
  'output_as', 'HTML')).to_clob
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(35999827766263097)
,p_plug_name=>'Upload File'
,p_region_template_options=>'#DEFAULT#:t-Region--removeHeader js-removeLandmark:t-Region--scrollBody'
,p_plug_template=>wwv_flow_imp.id(206001819399516915)
,p_plug_display_sequence=>10
,p_location=>null
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<input type="file" id="bpmnFile" accept=".bpmn,.xml">',
''))
,p_ai_enabled=>false
,p_attributes=>wwv_flow_t_plugin_attributes(wwv_flow_t_varchar2(
  'expand_shortcuts', 'N',
  'output_as', 'HTML')).to_clob
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(36000551147263104)
,p_plug_name=>'buttons - Save'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_imp.id(205953968697516893)
,p_plug_display_sequence=>30
,p_plug_new_grid_row=>false
,p_location=>null
,p_ai_enabled=>false
,p_attributes=>wwv_flow_t_plugin_attributes(wwv_flow_t_varchar2(
  'expand_shortcuts', 'N',
  'output_as', 'HTML')).to_clob
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(482321968555035721)
,p_plug_name=>'Items im/ex'
,p_region_template_options=>'#DEFAULT#:t-Region--removeHeader js-removeLandmark:t-Region--scrollBody'
,p_plug_template=>wwv_flow_imp.id(206001819399516915)
,p_plug_display_sequence=>500
,p_location=>null
,p_ai_enabled=>false
,p_attributes=>wwv_flow_t_plugin_attributes(wwv_flow_t_varchar2(
  'expand_shortcuts', 'N',
  'output_as', 'HTML')).to_clob
);
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(898183727129093106)
,p_plug_name=>'buttons import/export'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_imp.id(205953968697516893)
,p_plug_display_sequence=>20
,p_location=>null
,p_ai_enabled=>false
,p_attributes=>wwv_flow_t_plugin_attributes(wwv_flow_t_varchar2(
  'expand_shortcuts', 'N',
  'output_as', 'HTML')).to_clob
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(27968089008858262)
,p_button_sequence=>10
,p_button_plug_id=>wwv_flow_imp.id(898183727129093106)
,p_button_name=>'IMPORT_ITEM'
,p_button_action=>'DEFINED_BY_DA'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_imp.id(206066595937516952)
,p_button_image_alt=>'Import from Item'
,p_warn_on_unsaved_changes=>null
,p_grid_new_row=>'N'
,p_grid_new_column=>'Y'
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(27971882446858273)
,p_button_sequence=>10
,p_button_plug_id=>wwv_flow_imp.id(36000551147263104)
,p_button_name=>'SAVE_XML'
,p_button_action=>'DEFINED_BY_DA'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_imp.id(206066595937516952)
,p_button_image_alt=>'BPMN (xml)'
,p_warn_on_unsaved_changes=>null
,p_grid_new_row=>'N'
,p_grid_new_column=>'Y'
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(27968489505858264)
,p_button_sequence=>20
,p_button_plug_id=>wwv_flow_imp.id(898183727129093106)
,p_button_name=>'EXPORT_ITEM'
,p_button_action=>'DEFINED_BY_DA'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_imp.id(206066595937516952)
,p_button_image_alt=>'Export to XML Item'
,p_warn_on_unsaved_changes=>null
,p_grid_new_row=>'N'
,p_grid_new_column=>'Y'
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(27971048077858271)
,p_button_sequence=>20
,p_button_plug_id=>wwv_flow_imp.id(36000551147263104)
,p_button_name=>'SAVE_SVG'
,p_button_action=>'DEFINED_BY_DA'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_imp.id(206066595937516952)
,p_button_image_alt=>' SVG'
,p_warn_on_unsaved_changes=>null
,p_grid_new_row=>'N'
,p_grid_new_column=>'Y'
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(27971489040858271)
,p_button_sequence=>30
,p_button_plug_id=>wwv_flow_imp.id(36000551147263104)
,p_button_name=>'SAVE_PNG'
,p_button_action=>'DEFINED_BY_DA'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_imp.id(206066595937516952)
,p_button_image_alt=>'PNG'
,p_warn_on_unsaved_changes=>null
,p_grid_new_row=>'N'
,p_grid_new_column=>'Y'
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(27972271067858273)
,p_button_sequence=>40
,p_button_plug_id=>wwv_flow_imp.id(36000551147263104)
,p_button_name=>'SAVE_WEBP'
,p_button_action=>'DEFINED_BY_DA'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_imp.id(206066595937516952)
,p_button_image_alt=>'WEBP'
,p_warn_on_unsaved_changes=>null
,p_grid_new_row=>'N'
,p_grid_new_column=>'Y'
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(27972605755858273)
,p_button_sequence=>50
,p_button_plug_id=>wwv_flow_imp.id(36000551147263104)
,p_button_name=>'SAVE_JPG'
,p_button_action=>'DEFINED_BY_DA'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_imp.id(206066595937516952)
,p_button_image_alt=>'JPG'
,p_warn_on_unsaved_changes=>null
,p_grid_new_row=>'N'
,p_grid_new_column=>'Y'
);
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(8033191380404849)
,p_button_sequence=>10
,p_button_plug_id=>wwv_flow_imp.id(695328655248967798)
,p_button_name=>'SAVE'
,p_button_action=>'SUBMIT'
,p_button_template_options=>'#DEFAULT#:t-Button--iconLeft'
,p_button_template_id=>wwv_flow_imp.id(206066785444516952)
,p_button_image_alt=>'Save'
,p_button_position=>'PREVIOUS'
,p_icon_css_classes=>'fa-save'
);
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(29457408684073601)
,p_name=>'P100012_FILENAME'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_imp.id(35999827766263097)
,p_display_as=>'NATIVE_HIDDEN'
,p_attribute_01=>'N'
);
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(29460709695073634)
,p_name=>'P100012_LOV_DIAGRAM'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_imp.id(29460607797073633)
,p_prompt=>'Diagram'
,p_display_as=>'NATIVE_POPUP_LOV'
,p_lov=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select name, id',
'from my_flows',
'    '))
,p_lov_display_null=>'YES'
,p_cSize=>30
,p_field_template=>wwv_flow_imp.id(206063951942516949)
,p_item_template_options=>'#DEFAULT#'
,p_lov_display_extra=>'NO'
,p_attribute_01=>'POPUP'
,p_attribute_02=>'FIRST_ROWSET'
,p_attribute_04=>'N'
,p_attribute_05=>'N'
);
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(695334713025968022)
,p_name=>'P100012_IMPORT'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_imp.id(482321968555035721)
,p_item_default=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<?xml version="1.0" encoding="UTF-8"?>',
'<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http:'
||'//www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">',
'  <bpmn:process id="Process_1" isExecutable="false">',
'    <bpmn:startEvent id="StartEvent_1">',
'      <bpmn:outgoing>Flow_0m7gapm</bpmn:outgoing>',
'    </bpmn:startEvent>',
unistr('    <bpmn:task id="Activity_1qpmcb1" name="\0686\0627\067E &#34;\0633\0644\0627\0645&#34;">'),
'      <bpmn:incoming>Flow_0m7gapm</bpmn:incoming>',
'      <bpmn:outgoing>Flow_0j7g55e</bpmn:outgoing>',
'    </bpmn:task>',
'    <bpmn:sequenceFlow id="Flow_0m7gapm" sourceRef="StartEvent_1" targetRef="Activity_1qpmcb1" />',
'    <bpmn:endEvent id="Event_0383jp6">',
'      <bpmn:incoming>Flow_0j7g55e</bpmn:incoming>',
'    </bpmn:endEvent>',
'    <bpmn:sequenceFlow id="Flow_0j7g55e" sourceRef="Activity_1qpmcb1" targetRef="Event_0383jp6" />',
'  </bpmn:process>',
'  <bpmndi:BPMNDiagram id="BPMNDiagram_1">',
'    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">',
'      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">',
'        <dc:Bounds x="202" y="112" width="36" height="36" />',
'      </bpmndi:BPMNShape>',
'      <bpmndi:BPMNShape id="Activity_1qpmcb1_di" bpmnElement="Activity_1qpmcb1">',
'        <dc:Bounds x="290" y="90" width="100" height="80" />',
'        <bpmndi:BPMNLabel />',
'      </bpmndi:BPMNShape>',
'      <bpmndi:BPMNShape id="Event_0383jp6_di" bpmnElement="Event_0383jp6">',
'        <dc:Bounds x="442" y="112" width="36" height="36" />',
'      </bpmndi:BPMNShape>',
'      <bpmndi:BPMNEdge id="Flow_0m7gapm_di" bpmnElement="Flow_0m7gapm">',
'        <di:waypoint x="238" y="130" />',
'        <di:waypoint x="290" y="130" />',
'      </bpmndi:BPMNEdge>',
'      <bpmndi:BPMNEdge id="Flow_0j7g55e_di" bpmnElement="Flow_0j7g55e">',
'        <di:waypoint x="390" y="130" />',
'        <di:waypoint x="442" y="130" />',
'      </bpmndi:BPMNEdge>',
'    </bpmndi:BPMNPlane>',
'  </bpmndi:BPMNDiagram>',
'</bpmn:definitions>'))
,p_prompt=>'XML'
,p_display_as=>'NATIVE_TEXTAREA'
,p_cSize=>30
,p_cHeight=>5
,p_field_template=>wwv_flow_imp.id(206064186402516949)
,p_item_template_options=>'#DEFAULT#'
,p_attribute_01=>'Y'
,p_attribute_02=>'N'
,p_attribute_03=>'N'
,p_attribute_04=>'BOTH'
);
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(695334760658968023)
,p_name=>'P100012_EXPORT'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_imp.id(482321968555035721)
,p_prompt=>'Changed'
,p_display_as=>'NATIVE_TEXTAREA'
,p_cSize=>30
,p_cHeight=>5
,p_begin_on_new_line=>'N'
,p_field_template=>wwv_flow_imp.id(206064186402516949)
,p_item_template_options=>'#DEFAULT#'
,p_attribute_01=>'Y'
,p_attribute_02=>'N'
,p_attribute_03=>'N'
,p_attribute_04=>'BOTH'
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27976324781858292)
,p_name=>'Click - Export  to XML (ITEM)'
,p_event_sequence=>20
,p_triggering_element_type=>'BUTTON'
,p_triggering_button_id=>wwv_flow_imp.id(27968489505858264)
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'click'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27976846541858292)
,p_event_id=>wwv_flow_imp.id(27976324781858292)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>'bpmn.exportXML(''P100012_EXPORT'');'
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27977288179858293)
,p_name=>'Click - Load from XML'
,p_event_sequence=>30
,p_triggering_element_type=>'BUTTON'
,p_triggering_button_id=>wwv_flow_imp.id(27968089008858262)
,p_bind_type=>'live'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'click'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27977768238858293)
,p_event_id=>wwv_flow_imp.id(27977288179858293)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>wwv_flow_string.join(wwv_flow_t_varchar2(
'let xmlData = apex.items.P100012_IMPORT.getValue();',
'bpmn.load(xmlData);',
''))
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27978194038858293)
,p_name=>'Click - Save as XML'
,p_event_sequence=>40
,p_triggering_element_type=>'BUTTON'
,p_triggering_button_id=>wwv_flow_imp.id(27971882446858273)
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'click'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27978626764858295)
,p_event_id=>wwv_flow_imp.id(27978194038858293)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>'bpmn.downloadXML(''my-process.bpmn'');'
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27979070007858295)
,p_name=>'Click - Save as  SVG'
,p_event_sequence=>50
,p_triggering_element_type=>'BUTTON'
,p_triggering_button_id=>wwv_flow_imp.id(27971048077858271)
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'click'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27979542839858295)
,p_event_id=>wwv_flow_imp.id(27979070007858295)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>wwv_flow_string.join(wwv_flow_t_varchar2(
'bpmn.downloadSVG();',
''))
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27979980812858296)
,p_name=>'Click - Save as  PNG'
,p_event_sequence=>60
,p_triggering_element_type=>'BUTTON'
,p_triggering_button_id=>wwv_flow_imp.id(27971489040858271)
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'click'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27980493787858296)
,p_event_id=>wwv_flow_imp.id(27979980812858296)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>'bpmn.downloadImage();'
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27973217479858287)
,p_name=>'Click - Save as  JPG'
,p_event_sequence=>70
,p_triggering_element_type=>'BUTTON'
,p_triggering_button_id=>wwv_flow_imp.id(27972605755858273)
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'click'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27973684540858289)
,p_event_id=>wwv_flow_imp.id(27973217479858287)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>'bpmn.downloadImage(''diagram'',bpmn.IMAGE_FORMAT.JPEG);'
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27980821539858298)
,p_name=>'Click - Save as  WEBP'
,p_event_sequence=>80
,p_triggering_element_type=>'BUTTON'
,p_triggering_button_id=>wwv_flow_imp.id(27972271067858273)
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'click'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27981331628858298)
,p_event_id=>wwv_flow_imp.id(27980821539858298)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>'bpmn.downloadImage(''diagram'',bpmn.IMAGE_FORMAT.WEBP)'
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(27974099832858289)
,p_name=>'Change'
,p_event_sequence=>90
,p_triggering_element_type=>'REGION'
,p_triggering_region_id=>wwv_flow_imp.id(35999827766263097)
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'change'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(27974567083858290)
,p_event_id=>wwv_flow_imp.id(27974099832858289)
,p_event_result=>'TRUE'
,p_action_sequence=>10
,p_execute_on_page_init=>'N'
,p_action=>'NATIVE_JAVASCRIPT_CODE'
,p_attribute_01=>wwv_flow_string.join(wwv_flow_t_varchar2(
'bpmn.readFile(''bpmnFile'').then(({ content, filename }) => {',
'    bpmn.load(content);',
'',
'    apex.item(''P100012_IMPORT'').setValue(content);',
'    apex.item(''P100012_FILENAME'').setValue(filename);  ',
'});',
'',
'// async function loadBpmn() {',
'//     const { content, filename } = await bpmn.readFile(''bpmnFile'');',
'',
'//     await bpmn.load(content);',
'//     apex.item(''P100012_IMPORT'').setValue(content);',
'//     apex.item(''P100012_FILENAME'').setValue(filename);',
'// }',
'',
'// loadBpmn();',
''))
);
wwv_flow_imp_page.create_page_da_event(
 p_id=>wwv_flow_imp.id(29460842335073635)
,p_name=>'change'
,p_event_sequence=>100
,p_triggering_element_type=>'ITEM'
,p_triggering_element=>'P100012_LOV_DIAGRAM'
,p_bind_type=>'bind'
,p_execution_type=>'IMMEDIATE'
,p_bind_event_type=>'change'
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(29460909422073636)
,p_event_id=>wwv_flow_imp.id(29460842335073635)
,p_event_result=>'TRUE'
,p_action_sequence=>20
,p_execute_on_page_init=>'N'
,p_name=>'ref objects'
,p_action=>'NATIVE_REFRESH'
,p_affected_elements_type=>'REGION'
,p_affected_region_id=>wwv_flow_imp.id(29458389573073610)
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(29461091913073637)
,p_event_id=>wwv_flow_imp.id(29460842335073635)
,p_event_result=>'TRUE'
,p_action_sequence=>30
,p_execute_on_page_init=>'N'
,p_name=>'ref tasks'
,p_action=>'NATIVE_REFRESH'
,p_affected_elements_type=>'REGION'
,p_affected_region_id=>wwv_flow_imp.id(29458208044073609)
);
wwv_flow_imp_page.create_page_da_action(
 p_id=>wwv_flow_imp.id(29461102749073638)
,p_event_id=>wwv_flow_imp.id(29460842335073635)
,p_event_result=>'TRUE'
,p_action_sequence=>40
,p_execute_on_page_init=>'N'
,p_name=>'ref flows'
,p_action=>'NATIVE_REFRESH'
,p_affected_elements_type=>'REGION'
,p_affected_region_id=>wwv_flow_imp.id(29458402501073611)
);
wwv_flow_imp_page.create_page_process(
 p_id=>wwv_flow_imp.id(8033294443404850)
,p_process_sequence=>10
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'save in db'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'INSERT INTO MY_FLOWS (name,content)',
'VALUES(:P100012_FILENAME,:P100012_IMPORT);',
''))
,p_process_clob_language=>'PLSQL'
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_success_message=>unistr('\062A\063A\06CC\06CC\0631\0627\062A \062B\0628\062A \0634\062F')
,p_internal_uid=>8033294443404850
);
end;
/
prompt --application/end_environment
begin
wwv_flow_imp.import_end(p_auto_install_sup_obj => nvl(wwv_flow_application_install.get_auto_install_sup_obj, false)
);
commit;
end;
/
set verify on feedback on define on
prompt  ...done

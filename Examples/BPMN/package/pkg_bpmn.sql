create or replace package "PKG_BPMN" as

    /*==================================================*/
    -- types
    /*==================================================*/
    type rec_obj is record (
        id   varchar2(100),
        name varchar2(1000),
        bpmn_name varchar2(100),
        xml_name varchar2(100)
    );

    type tbl_objs is table of rec_obj;

    /*==================================================*/
    type rec_flow is record (
        id         varchar2(100),
        name       varchar2(1000),
        source_id  varchar2(100),        
        target_id  varchar2(100),
        xml_name       varchar2(100)
    );

    type tbl_flows is table of rec_flow;
   
    /*==================================================*/
    -- functions
    /*==================================================*/
    
    function get_objects(p_xml in clob)
    return tbl_objs pipelined;

    function get_activities(p_xml in clob)
    return tbl_objs pipelined;
    
    function get_flows(p_xml in clob) 
    return tbl_flows pipelined;
   
    /*==================================================*/

end "PKG_BPMN";
/
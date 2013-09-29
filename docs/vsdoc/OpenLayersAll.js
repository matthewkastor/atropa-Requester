
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary></summary>
        /// <field name="ArgsInfo" type="">Required module, the docs for it are in the &lt;code&gt;
        ///  atropa-ArgsInfo/docs&lt;/code&gt; directory where this module 
        ///  is located.</field>
        /// <returns type="atropa"/>
                
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);

  

  
  
/* vsdoc for atropa.Requester */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.Requester = function(){
        /// <summary></summary>
        /// <field name="requestHeaders" type="Request Headers Object">Object whose properties and values are header names and values
        ///  respectively.</field>
        /// <field name="timeout" type="Number">Set the timeout value for the request in milliseconds. The request will
        ///  abort after this amount of time has passed.</field>
        /// <returns type="atropa.Requester"/>
    };

    var $x = window.atropa.Requester;
    $x.prototype = {
                
        makeRequest: function(method, url, messageBody, callback) {
            /// <summary>Makes an AJAX request.</summary>
            /// <param name="method" type="String">The HTTP method to be used for this request.</param>
            /// <param name="url" type="String">The URL to send the request to.</param>
            /// <param name="messageBody" type="String">The body of the request.</param>
            /// <param name="callback" type="Object">The callback function to execute
            ///  when readyState is 4. The callback is supplied with two arguments. The
            ///  first argument is a boolean indicating whether or not the http status
            ///  was 200. The second argument is the request object.</param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.Requester";
})(this);



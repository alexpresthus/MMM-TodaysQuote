/* MagicMirror²
 * Module: TodaysQuote
 *
 * By Alexander Presthus
 * MIT Licensed.
 */
Module.register("TodaysQuote", {
    defaults: {
        quotes: {
            
        },
        updateInterval: 30000,
        remoteFile: null,
        fadeSpeed: 4000,
    },
    quoteUrl: ""
});
